import axios from "axios";
import {API_BASE_URL} from "constants/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});

// Alter defaults after instance has been created
// axiosInstance.defaults.headers.common['Authorization'] = '';

// axiosInstance.defaults.headers.common['Access-Control-Allow-Origin']= '*'
// axiosInstance.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
// axiosInstance.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
export default axiosInstance