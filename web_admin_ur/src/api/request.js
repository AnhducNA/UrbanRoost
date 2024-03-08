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
    getBookings(limit, page) {
        return axiosClient.get(`/api/booking?limit=${limit}&page=${page}`);
    },
    getBookingById(bookingId) {
        return axiosClient.get(`/api/booking/${bookingId}`);
    },
    getUserList(limit, page) {
        return axiosClient.get(`/api/user?limit=${limit}&page=${page}`);
    },
    getUserById(userId) {
        return axiosClient.get(`/api/user/${userId}`);
    },
    getBookingByUserId(userId) {
        return axiosClient.get(`/api/user/${userId}/booking`)
    },
    getPlaceByUserId(userId) {
        return axiosClient.get(`/api/user/${userId}/place`)
    },
    getRateByUserId(userId) {
        return axiosClient.get(`/api/user/${userId}/rate`)
    }
};

export default request;
