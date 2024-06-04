import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    //Creates a function to return whenver useRefreshToken is called
    //This function returns the access token for the user
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        //previous is used so you get the previous state
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            return {
                 ...prev, 
                 roles: response.data.roles,
                 accessToken: response.data.accessToken,
                 username: response.data.username
            }
        });
        
        return response.data.accessToken;
    }

  return refresh;
}

export default useRefreshToken;