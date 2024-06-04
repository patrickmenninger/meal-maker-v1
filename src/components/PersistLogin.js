import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';


const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    //Checks if the user has an access token associated with there account.
    //If they don't then one is generated with the verifyRefreshToken function
    //and if they do have one then the component is no longer loading.
    useEffect(() => {

        let isMounted = true;

        //Defines a function that is used to make sure the refresh token is valid
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;

    }, [auth?.accessToken, refresh])

    //Everytime the component is loading or the access token is changed
    useEffect(() => {

        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);

    }, [ isLoading, auth?.accessToken ])

    //If persist is true and isLoading is false then the children (outlet) is made
  return (
    <>
        {//Outlet used for all children components
        !persist
            ? <Outlet />
            : isLoading
                ? <p>Loading...</p>
                : <Outlet/>
        }
    </>
  )
}

export default PersistLogin