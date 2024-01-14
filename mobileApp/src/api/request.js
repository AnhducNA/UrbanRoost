import axiosClient from "./index";

const request = {
    async getPlaces() {
        try {
            return await axiosClient.get('/place');
        } catch (error) {
            console.log("Api call error: " + error.message);
        }
    }
};

export default request;
