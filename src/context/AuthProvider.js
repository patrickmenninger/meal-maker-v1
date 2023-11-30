//This is used to be able to pass data through the react app
//easier than having to pass each value down from the App.js file.

//
//
//Look into more of what this useContext() stuff does
//
//
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    //{} say that the auth takes in an object instead of just like a string
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { children }
        </AuthContext.Provider>
    )

}

export default AuthContext;