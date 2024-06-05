import '../index.css';
import Navigation from './Navigation.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons';
import Account from './Account.js';

const Header = () => {

  return (
    <header className="bg-off-white shadow-xl z-0 relative">
      <nav className="flex justify-between items-center pt-6 pb-4 px-4">
          {/* Contains logo, the name, and the account username */}
          <div className="flex items-center">
            <a href='/'>
              <FontAwesomeIcon icon={faPlateWheat} className="text-brown pr-4" size='2xl'/>
            </a>
            <h5 className="text-grey mb-0">M E A L M A K E R</h5>
          </div>
          <div className="flex items-center">
            <Navigation />
            <Account/>
          </div>
      </nav>
    </header>
  )
}

export default Header