import axios from 'axios'

const BASE_URL = "https://movies-island.herokuapp.com/api/";


const user = JSON.parse(localStorage.getItem("persist:root"))?.currentUser;
const TOKEN = JSON.parse(user)?.accessToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { authentication: `Bearer ${TOKEN}` }
});