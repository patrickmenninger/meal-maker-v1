import React from 'react'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import { useState } from 'react'

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password);

    }

  return (
    <div className="min-h-screen flex justify-center items-center bg-warm_beige">
        <Card bg="bg-mint_green">
            <form className="flex flex-col gap-8 p-6" onSubmit={handleSubmit} noValidate>
                <div>
                    <h2 className="text-2xl font-bold">Sign In</h2>
                </div>
                <Input 
                    label='Email'
                    type='email'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                />
                <Input 
                    label='Password'
                    type='password'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                />
                <Button type='submit'>Log In</Button>
            </form>
        </Card>
    </div>
  )
}

export default LoginPage