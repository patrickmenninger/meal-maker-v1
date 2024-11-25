import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Error from '../components/Error'
import Input from '../components/Input'
import Button from '../components/Button'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";

import axios from '../api/axios'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

const RegisterPage = () => {

    const navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPwd(result);
        const match = password === confirmPassword;
        setValidMatch(match);
    }, [password, confirmPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [email, password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!EMAIL_REGEX.test(email) || !PWD_REGEX.test(password)) {
            setErrMsg("Invalid input");
            return;
        } else if (!validMatch) {
            setErrMsg("Passwords do not match");
            return;
        }

        try {

            const data = {
                firstname,
                lastname,
                email,
                password,
                confirmPassword
            }

            await axios.post("/auth/register", data, 
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                }
            );

            navigate("/login");
        } catch (error) {
            if (error.status === 400) {
                setErrMsg("Invalid input");
            } else if (error.status === 409) {
                setErrMsg("Account with that email already exists");
            } else {
                setErrMsg(error);
            }
        }


    }

  return (
    <div className="min-h-screen flex justify-center items-center bg-soft_white">
        <Card bg="bg-warm_beige" className="md:w-1/3">
            <Error errMsg={errMsg}/>
            <form className="flex flex-col gap-4 p-6" onSubmit={handleSubmit} noValidate>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-charcoal_gray">Register</h2>
                    <Link to="/"><img src="/logo.png" className="h-16 w-16"/></Link>
                </div>
                <Input 
                    label='First Name'
                    type='text'
                    name='firstname'
                    className="w-full"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required={true}
                />
                <Input 
                    label='Last Name'
                    type='text'
                    name='lastname'
                    className="w-full"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required={true}
                />
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
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    required={true}
                />
                <div id='uidnote' className={pwdFocus ? '' : 'hidden'}>
                    <span className={validPwd && password ? 'text-green-500 pr-2' : 'hidden'}>
                        <FontAwesomeIcon icon={faCheck} size='xl'/>
                    </span>
                    <span className={validPwd ? 'hidden' : 'text-red-500 pr-2'}>
                        <FontAwesomeIcon icon={faTimes} size='xl'/>
                    </span>
                    8+ characters <br/> 
                    1+ capital letter <br/>
                    1+ lowercase letter <br/>
                    1+ numbers <br/>
                    1+ special characters <br/>

                </div>
                <Input 
                    label='Confirm Password'
                    type='password'
                    name='confirmPassword'
                    className="w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setConfirmPasswordFocus(true)}
                    onBlur={() => setConfirmPasswordFocus(false)}
                    required={true}
                />
                <div id='uidnote' className={confirmPasswordFocus ? '' : 'hidden'}>
                    <span className={validMatch && confirmPassword ? 'text-green-500 pr-2' : 'hidden'}>
                        <FontAwesomeIcon icon={faCheck} size='xl'/>
                    </span>
                    <span className={validMatch ? 'hidden' : 'text-red-500 pr-2'}>
                        <FontAwesomeIcon icon={faTimes} size='xl'/>
                    </span>
                    Passwords must match
                </div>
                <Button type='submit' disabled={!validEmail || !validPwd || !validMatch ? true : false}>Log In</Button>
                <div className="space-x-4">
                    <span>Already have an account?</span>
                    <Link to="/login" className="text-blue-700 hover:text-purple-950 underline">Log in here</Link>
                </div>
            </form>
        </Card>
    </div>
  )
}

export default RegisterPage