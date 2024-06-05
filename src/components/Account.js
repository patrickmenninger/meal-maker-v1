import '../index.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import { useState } from 'react';
import useLogout from '../hooks/useLogout';

//To persist logged in through page renders for now you can just use local storage
//link: https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f 
const User = () => {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const logout = useLogout();
  const navigate = useNavigate();

  const username = localStorage.getItem('username');

  const signOut = async () => {
    await logout();
    navigate('/');
  }

if (username) {
  return (
    <Navbar>
        <Navbar.Brand id='sign-in'  onClick={handleShow}>
            <FontAwesomeIcon icon={faCircleUser} className='sign-in-icon' size='xl'/>
            <Navbar.Text>{username}</Navbar.Text>
        </Navbar.Brand>
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <OffcanvasHeader closeButton>
                <OffcanvasTitle id='user-full-name'>{username}</OffcanvasTitle>
            </OffcanvasHeader>
            <OffcanvasBody>
                <ul style={{'listStyleType':'none'}}>
                    <li>
                        <Link className='user-choices' to='/my-recipes'>My Recipes</Link>
                    </li>
                    <li>
                        <Link className='user-choices' to='/plan'>My Plan</Link>
                    </li>
                    <li>
                        <Link className='user-choices' to='/macros'>My Macros</Link>
                    </li>
                    <li>
                        <Link className='user-choices' to='/settings'>Settings</Link>
                    </li>
                    <hr/>
                    <li>
                        <Link className='user-choices' onClick={signOut}>Logout</Link>
                    </li>
                </ul>
            </OffcanvasBody>
        </Offcanvas>
    </Navbar>
  )
} else {
    return (
        <div className="ml-6 pl-4 border-l border-black">
            <FontAwesomeIcon icon={faCircleUser} className="text-brown" size='2xl'/>
            <a href='/login' className="text-xl ml-4 text-grey no-underline hover:text-tan">Sign in</a>
        </div>
      )
}
}

export default User