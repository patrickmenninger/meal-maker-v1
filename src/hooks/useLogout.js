import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();

    //Creates the function to logout the user
    //The username is removed from local storage and the Java Application
    //Is in change of deleting refresh toekn
    const logout = async () => {
        setAuth({});

        localStorage.removeItem('username');

        try {
            const response = await axios.get('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }

    }

    return logout;
};

export default useLogout