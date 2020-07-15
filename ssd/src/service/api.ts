import Axios from "axios";
import axios from 'axios';

import url from './config';

const api = axios.create({
    baseURL: url.base_url,
});

export default api;