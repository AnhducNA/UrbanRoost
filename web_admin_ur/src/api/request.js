import axiosClient from "./index";

const request = {
    getPlaces(limit, page) {
        return axiosClient.get(`/api/place?limit=${limit}&page=${page}`);
    },
    getPlaceById(placeId) {
        return axiosClient.get(`/api/place/${placeId}`);
    },
    createPlace(place) {
        return axiosClient.post(`/api/place`, place);
    },
};

export default request;
