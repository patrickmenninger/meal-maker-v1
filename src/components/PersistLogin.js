import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';


const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {

        let isMounted = true;

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

    useEffect(() => {

        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);

    }, [ isLoading, auth?.accessToken ])

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