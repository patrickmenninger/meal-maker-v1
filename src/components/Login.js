import React from 'react'
import '../index.css';
import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LOGIN_URL = '/login';

const Login = () => {

  //Brackets used to grab certain values
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  //Gets where the user came from to transfer them after logging in
  const from = location.state?.from?.pathname || '/';

  const usernameRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');

  //When the page loads, clear the stored username and set the focus
  useEffect(() => {
    localStorage.removeItem('username');
    usernameRef.current.focus();
  }, [])

  //If the username or password is changed clear error message
  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  /*
   * On form submit, send to Java application the username and password in the package.
   * Get the access token and roles from the response from the Java Application.
   * Updates the Auth to the new values and then clear the username and password fields.
   * It then redirects the user back to the page they came from.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ username, password, roles, accessToken })

      setUsername('');
      setPassword('');

      //Get rid of this probably later because I think it is unsafe
      localStorage.setItem('username', username);

      //Navigates the user back to the page they either accessed login from
      //or were redirected from
      navigate(from, { replace: true });


    } catch (err) {

      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Username and password required.');
      } else if (err.response?.status === 404) {
        setErrMsg('Username not found.');
      } else if (err.response?.status === 401) {
        setErrMsg('Invalid password.');
      } else {
        setErrMsg('Login Failed.');
      }

    }

  }

  //Toggles wether the user wants the login to stay
  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  //If persist changes, then update the item in local storage
  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist])

  return (
    <div className="bg-off-white h-[91vh]">
      <div className="block mx-auto w-[400px]">
        <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
        <div className="text-center py-4 text-3xl">Login</div>
        <div className="border-[1.5px] border-grey p-4 bg-tan rounded-xl">
          <form>

            <div className="items-center">
              <label htmlFor="username" className="text-grey text-lg">
                Username:
              </label>
              <input
                className="w-full border-[1.5px] border-brown rounded-md px-2 py-1 bg-off-white"
                title="Please enter Username"
                placeholder=""
                spellCheck="false"
                type='text'
                name='username'
                ref={usernameRef}
                autoComplete='off'
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div className="my-4">
              <label for="password" className="text-grey text-lg">
                Password:
              </label>
              <input
                className="w-full border-[1.5px] border-brown rounded-md px-2 py-1 bg-off-white"
                title="Please enter Password"
                placeholder=""
                type='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                required
                value={password}
              />
            </div>

            <button type="button" className='block w-4/6 bg-brown rounded-lg py-2 mx-auto' onClick={handleSubmit} disabled={!username || !password ? true : false}>Login</button>

            <div className='persistCheck'>
              <input 
                type='checkbox'
                id='persist'
                onChange={togglePersist}
                checked={persist}
              />
              <label htmlFor='persist'>Trust this device?</label>
            </div>

          </form>
        </div>
        <div className="mt-4 border-[1.5px] border-grey p-2 bg-tan rounded-xl text-center">
          <p>Need an account?</p>
          <Link to='/register'>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login