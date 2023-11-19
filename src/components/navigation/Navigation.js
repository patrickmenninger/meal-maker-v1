import Navbar from 'react-bootstrap/Navbar';
import { Col } from 'react-bootstrap';
import './Navigation.css';

const Navigation = () => {
  return (
    <Navbar data-bs-theme='light' className='home-header'>
        <Col></Col>
        <Col></Col>
        <Col>
            <Navbar.Brand href='/' id='recipe'>
                Home
            </Navbar.Brand>
        </Col>
        <Col>
            <Navbar.Brand href='/recipes' id='recipe'>
                Recipes
            </Navbar.Brand>
        </Col>
        <Col>
            <Navbar.Brand href='/support' id='support'>
                Support
            </Navbar.Brand>
        </Col>
        <Col></Col>
        <Col></Col>
    </Navbar>
  )
}

export default Navigation