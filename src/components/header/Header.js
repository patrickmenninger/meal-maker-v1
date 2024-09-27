import './Header.css';
import Navigation from '../navigation/Navigation.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons';
import Account from '../account/Account.js';

const Header = () => {

  return (
    <header>
      <nav>
          {/* Contains logo, the name, and the account username */}
          <div className="nav-container">
            <a href='/'>
              <FontAwesomeIcon icon={faPlateWheat} id="logo" size='2xl'/>
            </a>
            <h5>M E A L M A K E R</h5>
          </div>
          <div className="nav-container">
            <Navigation />
            <Account/>
          </div>
      </nav>
    </header>
  )
}

export default Header