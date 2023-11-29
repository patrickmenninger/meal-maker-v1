import './Header.css';
import Navigation from '../navigation/Navigation.js';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons';
import User from '../user/User.js';
// import { useState } from 'react';

const Header = () => {
  // const [signedIn, setSignedIn] = useState(true);

  return (
    <div id='header'>
    <Navbar id='header'>
        <Container fluid>
            <Navbar.Brand href='/' className='logo'>
                <FontAwesomeIcon icon={faPlateWheat} style={{'color': 'black'}} size='xl'/>
            </Navbar.Brand>
            <Navbar.Text className='title'>M E A L M A K E R</Navbar.Text>
            <Navbar.Brand className='username'>
                <User signedIn={true}/>
            </Navbar.Brand>
        </Container>
    </Navbar>
    <Navigation />
    </div>
  )
}

export default Header