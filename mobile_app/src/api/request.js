import axiosClient from "./index";

const request = {
    // auth
    authLogin(user) {
        return axiosClient.post(`api/auth/login`, user);
    },
    authRegister(user) {
        return axiosClient.post(`api/auth/register`, user);
    },
    authForgotPassword(data) {
        return axiosClient.post(`api/auth/forgotPassword`, data);
    },
    // place
    getPlaceList(limit, page, search) {
        search = (search) ? search : '';
        return axiosClient.get(`/api/place?limit=${limit}&page=${page}&search=${search}`);
    },
    getPlaceListBySearchAdvanced(limit, page, search, search_place_category) {
        return axiosClient.get(`/api/place/search_advanced?limit=${limit}&page=${page}&search=${search}&search_place_category=${search_place_category}`);
    },
    getPlaceById(placeId) {
        return axiosClient.get(`/api/place/${placeId}`);
    },
    getRateAboutPlaceId(placeId) {
        return axiosClient.get(`/api/place/${placeId}/rate`);
    },
    getImageByPlaceId(placeId) {
        return axiosClient.get(`/api/place/${placeId}/image`);
    },
    getCategoryByPlaceId(placeId) {
        return axiosClient.get(`/api/place/${placeId}/category`);
    },
    getFavoritePlaceByUserid(userId) {
        return axiosClient.get(`/api/place/favorite/user/${userId}`);
    },
    // category
    getCategoryList(limit, page) {
        return axiosClient.get(`/api/category/?limit=${limit}&page=${page}`);
    },
    // user
    getUserById(userId) {
        return axiosClient.get(`/api/user/${userId}`);
    },

};

export default request;
