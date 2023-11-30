import React from 'react'
import './Login.css';
import {useRef, useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';

const LOGIN_URL = '/login';

const Login = () => {

  const navigate = useNavigate();

  //Look into why the curly brackets are used around setAuth
  //Maybe because its a function
  //Also could be that it is grabbing setAuth because multiple things where contained in AuthContext
  const { setAuth } = useContext(AuthContext);

  const usernameRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    usernameRef.current.focus();
  },[])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(LOGIN_URL,
        JSON.stringify({username, password}),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      
      const accessToken = response?.data;
      //const roles = response?.data?.roles;

      //add roles to this if you put it in
      setAuth( {username, password, accessToken} )

      setUsername('');
      setPassword('');
      navigate('/');


    } catch (err) {

      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status >= 400) {
        setErrMsg(err.response?.data);
      } else {
        setErrMsg('Login Failed.');
      }

    }

  }

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
        </Form>
        <p>
          Need an account? <br/>
          <span>
            <a href='/register'>Sign Up</a>
          </span>
        </p>
    </div>
  )
}

export default Login