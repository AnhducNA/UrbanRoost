import axiosClient from "./index";

const request = {
    async getPlaces() {
        try {
            return await axiosClient.get('/place');
        } catch (error) {
            console.log("Api getPlaces call error: " + error.message);
        }
    },
    async getPlaceById(placeId) {
        try {
            return await axiosClient.get(`/place/${placeId}`);
        } catch (error) {
            console.log("Api getPlaceById call error: " + error.message);
        }
    },
};

export default request;
