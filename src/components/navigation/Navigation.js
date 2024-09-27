import '../../index.css';

const Navigation = () => {
  return (
    <div>
      <nav className="md:hidden">
        Not made for small screens yet
      </nav>
      <nav className="items-center py-0 hidden md:flex">
          <ul className='flex items-center gap-x-8 mb-0'>
            {/* Navlinks to the home page, the list of recipes, and the support */}
            <li>
              <a href='/' className='text-grey no-underline hover:text-tan'>Home</a>
            </li>
            <li>
              <a href='/recipes' className='text-grey no-underline hover:text-tan'>Recipes</a>
            </li>
            <li>
              <a href='/support' className='text-grey no-underline hover:text-tan'>Support</a>
            </li>
          </ul>
      </nav>
    </div>
  )
}

export default Navigation