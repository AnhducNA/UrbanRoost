import axios from "axios";

// Set config defaults when creating the instance
const axiosClient = axios.create({
    baseURL: 'http://192.168.90.108:8000'
});

export default axiosClient;

