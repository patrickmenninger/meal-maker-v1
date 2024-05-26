import { Outlet } from "react-router-dom";

import React from 'react'

//Renders the children elements
const Layout = () => {
    return (
        <main>
            <Outlet/>
        </main>
    )
}

export default Layout