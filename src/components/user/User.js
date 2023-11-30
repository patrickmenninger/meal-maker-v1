import './User.css';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import { useState } from 'react';

//To persist logged in through page renders for now you can just use local storage
//link: https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f 
const User = ({username}) => {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
                        <a className='user-choices' href='/my-recipes'>My Recipes</a>
                    </li>
                    <li>
                        <a className='user-choices' href='/plan'>My Plan</a>
                    </li>
                    <li>
                        <a className='user-choices' href='/macros'>My Macros</a>
                    </li>
                    <li>
                        <a className='user-choices' href='/settings'>Settings</a>
                    </li>
                    <hr/>
                    <li>
                        <a className='user-choices' href='/sign-in'>Logout</a>
                    </li>
                </ul>
            </OffcanvasBody>
        </Offcanvas>
    </Navbar>
  )
} else {
    return (
        <Navbar>
            <Navbar.Brand className='sign-in'>
                <FontAwesomeIcon icon={faCircleUser} className='sign-in-icon' size='xl'/>
                <a href='/login'>Sign in</a>
            </Navbar.Brand>
        </Navbar>
      )
}
}

export default User