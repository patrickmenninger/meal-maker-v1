import './Header.css';
import Navigation from '../navigation/Navigation.js';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons';
import User from '../user/User.js';
import AuthContext from '../../context/AuthProvider.js';
import { useContext } from 'react';

const Header = () => {

  //Figure how to use this an keep the data on page refresh
  //You had it under the User tag but the username wasn't persisting through refreshes, so figure it out
  const { auth } = useContext(AuthContext);

  return (
    <div id='header'>
    <Navbar id='header'>
        <Container fluid>
            <Navbar.Brand href='/' className='logo'>
                <FontAwesomeIcon icon={faPlateWheat} style={{'color': 'black'}} size='xl'/>
            </Navbar.Brand>
            <Navbar.Text className='title'>M E A L M A K E R</Navbar.Text>
            <Navbar.Brand className='username'>
                <User username={auth.username}/>
            </Navbar.Brand>
        </Container>
    </Navbar>
    <Navigation />
    </div>
  )
}

export default Header