import './Header.css';
import Navigation from '../navigation/Navigation.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons';
import Account from '../account/Account.js';

const Header = () => {

  return (
    <header>
      <div className="logo-container">
        <a href='/'>
          <FontAwesomeIcon icon={faPlateWheat} id="logo" size='2xl'/>
        </a>
        <h5 id="company">M E A L M A K E R</h5>
      </div>
      <nav>
        <Account />
        <Navigation />
      </nav>
    </header>
  )
}

export default Header