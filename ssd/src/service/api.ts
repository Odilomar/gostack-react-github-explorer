import Axios from "axios";
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44307',
});

export default api;