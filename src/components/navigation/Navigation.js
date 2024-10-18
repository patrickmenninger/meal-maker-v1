import '../../index.css';
import {Link} from 'react-router-dom';
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import { useState } from 'react';

const Navigation = () => {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <nav className="">
        <svg onClick={handleShow} width="2em" height="2em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 5H2V3h12v2zm0 4H2V7h12v2zM2 13h12v-2H2v2z"/></svg>
      </nav>
      <Offcanvas show={show} onHide={handleClose} placement='end' style={{width: "350px"}}>
        <OffcanvasHeader closeButton>
            <OffcanvasTitle id='user-full-name'>title</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
            <ul>
              {/* Navlinks to the home page, the list of recipes, and the support */}
              <li>
                <a href='/' className=''>Home</a>
              </li>
              <li>
                <a href='/recipes' className=''>Recipes</a>
              </li>
              <li>
                <a href='/support' className=''>Support</a>
              </li>
            </ul>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  )
}

export default Navigation