import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../index.css';
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

    /*
     * On submit of the form. If either the username or password doesn't pass the REGEX, it is considered invalid.
     * Trys to post the form to the server with the username and password in the request.
     */
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
        {/* Checks for successful form submission */}
        {success ? (
            /* If successful the user is prompted to go to the sign in page */
            <div>
                <h1>Success!</h1>
                <a href='/login'>Sign In</a>
            </div>
        ) : (
            <div className="bg-off-white h-[91vh]">
                {/*If the person isn't successfully logged in, then the form is displayed*/}
                <div className="block mx-auto w-[400px]">
                    {/* Displays the error message if there exists one, else it is offscreen */}
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                    <div className="text-center py-4 text-3xl text-grey">Register</div>
                    <div className="border-[1.5px] border-grey p-4 bg-tan rounded-xl">
                        <form>
                            <div>
                                {/*
                                * Username field. Checks for a valid name and if it is valid a checkmark is displayed
                                * If the name is invalid and the user exists a red x is displayed
                                */}
                                <label htmlFor="username" className="text-grey text-lg">
                                    Username: 
                                    <span className={validName ? 'valid' : 'hide'}>
                                        <FontAwesomeIcon icon={faCheck} size='xl'/>
                                    </span>
                                    <span className={validName || !user ? 'hide' : 'invalid'}>
                                        <FontAwesomeIcon icon={faTimes} size='xl'/>
                                    </span>
                                </label>
                                {/*
                                * On change set the value of user based on the current text in the field (onChange).
                                * ref is to set the focus to the user field
                                * onBlur is when the user clicks off the field, onFocus is when they click on
                                */}
                                <input
                                    className="w-full border-[1.5px] border-brown rounded-md px-2 py-1 bg-off-white"
                                    title="Please enter Username"
                                    placeholder=""
                                    spellCheck="false"
                                    type='text' 
                                    name='username'
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                {/* 
                                * If the user is focused and there is something in the field and the name isn't valid
                                * the instructions are displayed, else they are offscreen
                                */}
                                <div id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    4 to 20 characters. <br />
                                    Must begin with a letter. <br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </div>
                            </div>
                            <div  className="my-4">
                                {/*
                                * If the password is valid a checkmark appears.
                                * If the password isn't valid and the password exists then an x appears
                                */}
                                <label htmlFor="password" className="text-grey text-lg">
                                    Password: 
                                    <span className={validPwd ? 'valid' : 'hide'}>
                                        <FontAwesomeIcon icon={faCheck} size='xl'/>
                                    </span>
                                    <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                                        <FontAwesomeIcon icon={faTimes} size='xl'/>
                                    </span>
                                </label>
                                {/*
                                * Type changes based on what the user selects.
                                * onChange it changes the password variable
                                */}
                                <input
                                    className="w-full border-[1.5px] border-brown rounded-md px-2 py-1 bg-off-white"
                                    title="Please enter Password"
                                    placeholder=""
                                    type="password"
                                    name='password'
                                    autoComplete="off"
                                    onChange={(e) => setPwd(e.target.value)}
                                    required
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <div id='uidnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    At least 8 characters. <br />
                                    Must include uppercase and lowercase letters, a number and a special charcter. <br />
                                    Allowed special characters: !, @, #, $, %, ^, &
                                </div>
                            </div>
                            <div className="my-4">
                                <label htmlFor="confirmPwd" className="text-grey text-lg">
                                    Confirm Password: 
                                    <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                                        <FontAwesomeIcon icon={faCheck} size='xl'/>
                                    </span>
                                    <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                                        <FontAwesomeIcon icon={faTimes} size='xl'/>
                                    </span>
                                </label>
                                <input
                                    title="Re-enter Password"
                                    className="w-full border-[1.5px] border-brown rounded-md px-2 py-1 bg-off-white"
                                    name="confirmPwd"
                                    type="password"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    required
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                {/*
                                * If the match field is focused and the passwords aren't a valid match then display the instructions
                                */}
                                <div id='uidnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password input field.
                                </div>
                            </div>
                            {/*
                            * On click to submit the form. The button is disabled if the name is invalid,
                            * if the password is invalid, and if the passwords don't match
                            */}
                            <button type="button" className='block w-4/6 bg-brown rounded-lg py-2 mx-auto' onClick={handleSubmit} disabled={!validName || !validPwd || !validMatch ? true : false}>Submit</button>
                        </form>
                    </div>
                    <div className="mt-4 border-[1.5px] border-grey p-2 bg-tan rounded-xl text-center">
                        <p className="text-grey mb-1">Already registered? </p>
                        <Link to='/login'>Sign In</Link>
                    </div>
                </div>
            </div>
            )}
    </>
  )
}

export default Register

