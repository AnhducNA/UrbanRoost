import axiosClient from "./index";

const request = {
    getPlaceList(limit, page, search) {
        return axiosClient.get(`/api/place?limit=${limit}&page=${page}&search=${search}`);
    },
    getPlaceListBySearchAdvanced(limit, page, search, search_place_category) {
        return axiosClient.get(`/api/place/search_advanced?limit=${limit}&page=${page}&search=${search}&search_place_category=${search_place_category}`);
    },
    getPlaceById(placeId) {
        return axiosClient.get(`/api/place/${placeId}`);
    },
    getCategoryList(limit, page) {
        return axiosClient.get(`/api/category/?limit=${limit}&page=${page}`);
    },
};

export default request;
