import axios from 'axios';

const BASE_URL = 'http://localhost:8080'

export default axios.create({
    baseURL: BASE_URL
});

//Attaches interceptors to request which gets a new access token if it is denied i think
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
});