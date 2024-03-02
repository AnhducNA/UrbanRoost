import axios from "axios";

// Set config defaults when creating the instance
const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

export default axiosClient;
