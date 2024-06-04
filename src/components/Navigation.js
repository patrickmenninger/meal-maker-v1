import '../index.css';

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
              <a href='/' className='text-stone-700 no-underline hover:text-blue-500'>Home</a>
            </li>
            <li>
              <a href='/recipes' className='text-stone-700 no-underline hover:text-blue-500'>Recipes</a>
            </li>
            <li>
              <a href='/support' className='text-stone-700 no-underline hover:text-blue-500'>Support</a>
            </li>
          </ul>
      </nav>
    </div>
  )
}

export default Navigation