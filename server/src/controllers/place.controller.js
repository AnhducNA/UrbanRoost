const PlaceModel = require('../models/place.model');
const CategoryModel = require("../models/category.model");

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
            (rateList && rateList.map(rateItem => {
                rateTotal += parseInt(rateItem.star);
            }))
            const rateAverage = (rateTotal / rateList.length).toFixed(1);
            res.json({
                data: rateList,
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
                image_list.map(async image=> {
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
                image_list.map(async image=> {
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
