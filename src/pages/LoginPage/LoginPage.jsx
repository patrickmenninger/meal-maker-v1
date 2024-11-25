import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Error from '../../components/Error'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Button from '../../components/Button'
import axios from '../../api/axios'
import { useState, useEffect } from 'react'
import "./LoginPage.css"

const LoginPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post("/auth/authenticate", {email, password}, 
                {
                    headers: {'Content-Type': "application/json"},
                    withCredentials: true
                }
            );
            
            axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.accessToken}`};

            setEmail('');
            setPassword('');

            navigate(from, {replace: true})

        } catch (error) {
            if (error.status === 401) {
                setErrMsg("Invalid email or password");
            } else {
                setErrMsg(error);
            }
        }

    }

  return (
    <div className="min-h-screen flex justify-center items-center bg-soft_white">
        <Card bg="bg-warm_beige" className="md:w-1/3">
            <Error errMsg={errMsg}/>
            <form className="flex flex-col gap-8 p-6" onSubmit={handleSubmit} noValidate>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-charcoal_gray">Sign In</h2>
                    <Link to="/"><img src="/logo.png" className="h-16 w-16"/></Link>
                </div>
                <Input 
                    label='Email'
                    type='email'
                    name='email'
                    className="w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                />
                <Input 
                    label='Password'
                    type='password'
                    name='password'
                    className="w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                />
                <Button type='submit'>Log In</Button>
                <div className="space-x-4">
                    <span>Don't have an account?</span>
                    <Link to="/register" className="text-blue-700 hover:text-purple-950 underline">Sign up here</Link>
                </div>
            </form>
        </Card>
    </div>
  )
}

export default LoginPage