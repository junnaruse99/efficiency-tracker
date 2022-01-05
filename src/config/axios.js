import axios from 'axios';

const clientAxios = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:4000'
});

export default clientAxios;

