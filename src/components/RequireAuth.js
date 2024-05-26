import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        /*
         * If the list of roles exist, compare them all to the allowed roles.
         * If one is found then the children components can be displayed
         */
        auth?.roles?.find(role => allowedRoles?.includes(role))
            //Outlet represents all the child components of RequireAuth. 
            //Means that all the children components can be protected.
            //The children components are displayed if the role isn't found
            ? <Outlet />
            //Checks if the user is logged in
            : auth?.username
                    //If user is logged in then they are just unauthorized
                    ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                    //Redirects the user to the login screen if they aren't logged in
                    //Adds the state 'from' so the user can use the back arrow and go back to where they were
                    : <Navigate to='/login' state={{ from: location }} replace />
    );
}

export default RequireAuth;