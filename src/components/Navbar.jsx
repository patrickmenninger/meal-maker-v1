import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="p-4 bg-olive_green border-b border-charcoal_gray">
        <NavLink to="/" className="flex flex-shrink-0 items-center">
            <img src="/logo.png" className="h-10 w-10" alt="MealMaker" />
            <span className="hidden md:block ml-2 text-2xl text-warm_beige">MealMaker</span>
        </NavLink>
    </nav>
  )
}

export default Navbar