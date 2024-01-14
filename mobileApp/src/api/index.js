import axios from "axios";

// Set config defaults when creating the instance
const axiosClient = axios.create({
    baseURL: 'http://192.168.90.102:8000'
});
// axios.get('/place')
//     .then(response => {
//         console.log(response.data)
//     })
//     .catch((error)=>{
//         console.log("Api call error: " + error.message);
//         alert("Api call error: " + error.message);
//     });

export default axiosClient;

