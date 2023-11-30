import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import './Register.css';
import Button from "react-bootstrap/Button";
import axios from "../../api/axios.js";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,20}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

//Set the endpoint for registration in api
const REGISTER_URL = '/register';


const Register = () => {

    //Used to reference the user field and the error message
    const userRef = useRef();
    const errRef = useRef();

    //Used to set what the user is typing to the variable user
    //Also checks for valid username and to set the focus
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    //Used to set what the user is typing to the variable password
    //Also checks for valid password and to set the focus
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    
    //Used to set what the user is typing to the variable matching password
    //Also checks for valid matching password and to set the focus
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    //Used to set the error message displayed and to set whether all the
    //Fields are filled in correctly
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //Sets the focus and only does this when the page loads
    useEffect(() => {
        userRef.current.focus();
    },[])

    //Checks for valid username and runs everytime the user variable is changed
    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    //Checks for valid password and runs everytime the password or matchPwd variable is changed
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    //Changes error message and clears the error message once any field is changed
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])


    //Sets the type of field to show the password
    const [pwdType, setPwdType] = useState('password');

    const showPwd = () => {
        if (pwdType === 'password') {
            setPwdType('text')
        } else {
            setPwdType('password')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        //Trys to get the response from the server (post) and catches error
        try {

            //JSON.stringify destructs an object with fields user and pwd. user and 
            //pwd must match the fields used in api for users
            //If the fields in the api are different then use the form:
            // apiName: varName
            //So it could be user (Since it would be the same)
            //And password: pwd
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    //withCredentials is used to send the cookies (authorization)
                    // withCredentials: true
                }
            );
            //Could get rid of this later
            console.log(response.data);
            setSuccess(true);
            //Clear input fields
            

        } catch (err) {
            if (!err?.response) {
                console.log(err);
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                //Might need to add this functionality in your own backend
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
            //For screen readers, probaly don't need
            errRef.current.focus();
        }

    }

    //Can add accessibility maybe later (aria-live, etc.)
  return (
    <>
        {success ? (
            <div>
                <h1>Success!</h1>
                <a href='/sign-in'>Sign In</a>
            </div>
        ) : (
            <div className='register-form'>
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                <div>Register</div>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            Username: 
                            <span className={validName ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} size='xl'/>
                            </span>
                            <span className={validName || !user ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} size='xl'/>
                            </span>
                        </Form.Label>
                        <Form.Control 
                            type='text' 
                            id='username'
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <Form.Text id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 20 characters. <br />
                            Must begin with a letter. <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Password: 
                            <span className={validPwd ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} size='xl'/>
                            </span>
                            <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} size='xl'/>
                            </span>
                            <Button onClick={showPwd} className='show-button'>
                                <FontAwesomeIcon icon={faEye}/>
                            </Button>
                        </Form.Label>
                        <Form.Control 
                            type={pwdType} 
                            id='password'
                            autoComplete="off"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <Form.Text id='uidnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            At least 8 characters. <br />
                            Must include uppercase and lowercase letters, a number and a special charcter. <br />
                            Allowed special characters: !, @, #, $, %, ^, &
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Confirm Password: 
                            <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} size='xl'/>
                            </span>
                            <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} size='xl'/>
                            </span>
                        </Form.Label>
                        <Form.Control 
                            type={pwdType} 
                            id='confirm_pwd'
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <Form.Text id='uidnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </Form.Text>
                    </Form.Group>
                    <Button onClick={handleSubmit} disabled={!validName || !validPwd || !validMatch ? true : false}>Submit</Button>
                </Form>
                <p>
                    Already registered? <br/>
                    <span className='line'>
                        <a href='/login'>Sign In</a>
                    </span>
                </p>
            </div>
            )}
    </>
  )
}

export default Register

