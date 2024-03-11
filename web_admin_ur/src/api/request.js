import axiosClient from "./index";

const request = {
    getPlaceList(limit, page, search) {
        return axiosClient.get(`/api/place?limit=${limit}&page=${page}&search=${search}`);
    },
    getPlaceById(placeId) {
        return axiosClient.get(`/api/place/${placeId}`);
    },
    getRateAboutPlaceId(placeId) {
        return axiosClient.get(`/api/place/${placeId}/rate`);
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
    getUserList(limit, page, search) {
        return axiosClient.get(`/api/user?limit=${limit}&page=${page}&search=${search}`);
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
    },
    getRateList(limit, page) {
        return axiosClient.get(`/api/rate?limit=${limit}&page=${page}`);
    },
    getRateById(rateId) {
        return axiosClient.get(`/api/rate/${rateId}`);
    },
    getCategoryList(limit, page) {
        return axiosClient.get(`/api/category/?limit=${limit}&page=${page}`);
    },
    getCategoryById(categoryId) {
        return axiosClient.get(`/api/category/${categoryId}`);
    },
    categoryNew(dataNew) {
        return axiosClient.post(`/api/category`, dataNew);
    },
    categoryUpdate(dataUpdate) {
        return axiosClient.put(`/api/category`, dataUpdate);
    },
    deleteCategoryById(categoryId) {
        return axiosClient.delete(`/api/category/${categoryId}`);
    },
};

export default request;
