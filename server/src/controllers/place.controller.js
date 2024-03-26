const PlaceModel = require('../models/place.model');
const formatDate = (date) => {
    return (date) ? date.toLocaleDateString("vn-VN") : date
};

module.exports = {
    getPlaceList: async (req, res) => {
        try {
            let {limit, page, search} = (req.query);
            const offset = (page - 1) * limit;
            const places = await PlaceModel.getPlaceList(limit, offset, search);
            let totalPlaces = await PlaceModel.getPlaceCount();
            totalPlaces = totalPlaces[0].count;
            const totalPage = Math.ceil(totalPlaces / limit);
            res.json({
                data: places,
                pagination: {
                    limit: +limit,
                    page: +page,
                    totalPage: +totalPage,
                    totalData: +totalPlaces
                }
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getPlaceListBySearchAdvanced: async (req, res) => {
        try {
            let {limit, page, search, search_place_category} = (req.query);
            const offset = (page - 1) * limit;
            const places = await PlaceModel.getPlaceList(limit, offset, search, search_place_category);
            let totalPlaces = (places && places.length);
            const totalPage = Math.ceil(totalPlaces / limit);
            res.json({
                data: places,
                pagination: {
                    limit: +limit,
                    page: +page,
                    totalPage: +totalPage,
                    totalData: +totalPlaces
                }
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getFavoritePlaceByUserid: async (req, res) => {
        try {
            let userId = (req.params.userId);
            const placeList = await PlaceModel.getFavoritePlaceByUserid(userId);
            let totalPlaces = await PlaceModel.getPlaceCount();
            totalPlaces = totalPlaces[0].count;
            res.json({
                data: placeList,
                pagination: {
                    totalData: +totalPlaces
                }
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getPlaceById: async (req, res) => {
        const placeId = req.params.placeId;
        try {
            const places = await PlaceModel.getPlaceById(placeId);
            res.json({
                data: places,
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getRateAboutPlaceId: async (req, res) => {
        const placeId = req.params.placeId;
        try {
            const rateList = await PlaceModel.getRateAboutPlaceId(placeId);
            let rateTotal = 0;
            (rateList && rateList.map(rate => {
                rateTotal += parseInt(rate.star);
                rate.created_at = formatDate(rate.created_at)
                rate.updated_at = formatDate(rate.updated_at)
            }))
            const rateAverage = (rateTotal / rateList.length).toFixed(1);
            res.json({
                data: rateList,
                totalRate: rateList.length,
                rateAverage: rateAverage,
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getImageByPlaceId: async (req, res) => {
        const placeId = req.params.placeId;
        try {
            const imageList = await PlaceModel.getImageByPlaceId(placeId);

            res.json({
                data: imageList
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getCategoryByPlaceId: async (req, res) => {
        const placeId = req.params.placeId;
        try {
            const categoryList = await PlaceModel.getCategoryByPlaceId(placeId);
            res.json({
                data: categoryList
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    newFavoritePlaceByUserId: async (req, res) => {
        const {placeId, userId} = req.body;
        try {
            if (!placeId || !userId) {
                res.json({
                    success: false,
                    message: 'Địa điểm hoặc người dùng không tồn tại',
                    data: {},
                });
            } else {
                const favoritePlace = await PlaceModel.getFavoritePlaceByUserIdAndPlaceId(placeId, userId);
                if (favoritePlace && favoritePlace.length > 0) {
                    res.json({
                        success: true,
                        message: 'Địa điểm yêu thích đã có trong danh sách',
                    });
                } else {
                    await PlaceModel.newFavoritePlaceByUserId(placeId, userId);
                    res.json({
                        success: true,
                        message: 'Thêm địa điểm yêu thích thành công',
                    });
                }
            }
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    deleteFavoritePlaceByUserIdAndPlaceId: async (req, res) => {
        const {placeId, userId} = req.query;
        console.log(req.query)
        try {
            if (!placeId || !userId) {
                res.json({
                    success: false,
                    message: 'Địa điểm hoặc người dùng không tồn tại',
                    data: {},
                });
            } else {
                const favoritePlace = await PlaceModel.getFavoritePlaceByUserIdAndPlaceId(placeId, userId);
                if (favoritePlace && favoritePlace.length > 0) {
                    await PlaceModel.deleteFavoritePlaceByUserIdAndPlaceId(placeId, userId);
                    res.json({
                        success: true,
                        message: 'Xóa địa điểm yêu thích thành công',
                    });
                } else {
                    await PlaceModel.newFavoritePlaceByUserId(placeId, userId);
                    res.json({
                        success: true,
                        message: 'Địa điểm yêu thích không có trong danh sách',
                    });
                }
            }
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    placeNew: async (req, res) => {
        const {
            title,
            description,
            location,
            price,
            state,
            place_category_id_list,
            image_list
        } = req.body;
        try {
            const result = await PlaceModel.placeNew(
                title,
                description,
                location,
                price,
                state,
            );
            const insertId = result.insertId;
            if (place_category_id_list) {
                await PlaceModel.deletePlaceCategoryByPlaceId(insertId);
                place_category_id_list.map(async place_category_id => {
                    await PlaceModel.newPlaceCategory(insertId, place_category_id)
                })
            }
            if (image_list) {
                await PlaceModel.deleteImageByPlaceId(insertId);
                image_list.map(async image => {
                    await PlaceModel.newImage(image, insertId)
                })
            }
            res.json({
                success: true,
                data: {
                    message: 'Create place success',
                },
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    placeUpdate: async (req, res) => {
        const {
            id,
            title,
            description,
            location,
            price,
            state,
            place_category_id_list,
            image_list
        } = req.body;
        try {
            await PlaceModel.placeUpdate(
                id,
                title,
                description,
                location,
                price,
                state,
            );
            if (place_category_id_list) {
                await PlaceModel.deletePlaceCategoryByPlaceId(id);
                place_category_id_list.map(async place_category_id => {
                    await PlaceModel.newPlaceCategory(id, place_category_id)
                })
            }
            if (image_list) {
                await PlaceModel.deleteImageByPlaceId(id);
                image_list.map(async image => {
                    await PlaceModel.newImage(image, id)
                })
            }
            res.json({
                success: true,
                data: {
                    message: 'Update data success',
                },
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

}
