import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        // const responseIntercept = axiosPrivate.interceptors.response.use(
        //     response => response,
        //     async (error) => {
        //         const prevRequest = error?.config;
        //         prevRequest.sent = false;
        //         //Checks if the accessToken expired due to time
        //         if (error?.response?.status === 403 && !prevRequest?.sent) {
        //             prevRequest.sent = true;
        //             const newAccessToken = await refresh();
        //             prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        //             return axiosPrivate(prevRequest);
        //         }
        //         return Promise.reject(error);
        //     }
        // )

        //Cleanup
        return () => {
            axiosPrivate.interceptors.response.eject(requestIntercept);
            // axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    },[auth])

    return axiosPrivate;
}

export default useAxiosPrivate;