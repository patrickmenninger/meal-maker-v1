import React from 'react'
import './Login.css';
import { useRef, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from '../../api/axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LOGIN_URL = '/login';

const Login = () => {

  //Look into why the curly brackets are used around setAuth
  //Maybe because its a function
  //Also could be that it is grabbing setAuth because multiple things where contained in AuthContext
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  //Gets where the user came from to transfer them after logging in
  const from = location.state?.from?.pathname || '/';

  const usernameRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    localStorage.removeItem('username');
    usernameRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

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

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist])

  return (
    <div className='login-form'>
      <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
      <div>Login</div>
      <Form>
        <Form.Group>
          <Form.Label>
            Username:
          </Form.Label>
          <Form.Control
            type='text'
            id='username'
            ref={usernameRef}
            autoComplete='off'
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Password:
          </Form.Label>
          <Form.Control
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
          />
        </Form.Group>
        <Button className='login-btn' onClick={handleSubmit} disabled={!username || !password ? true : false}>Login</Button>
        <div className='persistCheck'>
          <input 
            type='checkbox'
            id='persist'
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor='persist'>Trust this device?</label>
        </div>
      </Form>
      <p>
        Need an account? <br />
        <span>
          <Link to='/register'>Sign Up</Link>
        </span>
      </p>
    </div>
  )
}

export default Login