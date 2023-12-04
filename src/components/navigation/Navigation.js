import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import './Navigation.css';

const Navigation = () => {
  return (
    <Navbar data-bs-theme='light' className='home-header justify-content-center'>
        <Nav>
            <Nav.Link className='px-5' href='/'>Home</Nav.Link>
            <Nav.Link className='px-5' href='/recipes'>Recipes</Nav.Link>
            <Nav.Link className='px-5' href='/support'>Support</Nav.Link>
        </Nav>
    </Navbar>
  )
}

export default Navigation