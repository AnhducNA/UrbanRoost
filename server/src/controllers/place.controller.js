const Place = require('../models/place.model');
const db = require('../database');

module.exports = {
    getPlaces: async (req, res) => {
        try {
            const places = await Place.getPlaces();
            res.json(places);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    getPlaceById: async (req, res) => {
        const placeId = req.params.placeId;
        try {
            const places = await Place.getPlaceById(placeId);
            res.json(places);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    createPlace: async (req, res) => {
        const {
            title,
            description,
            img,
            location,
            price,
            lat,
            long,
            state,
            place_type_id
        } = req.body;
        try {
            const results = await Place.createPlace(
                title,
                description,
                img,
                location,
                price,
                lat,
                long,
                state,
                place_type_id
            );
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

}
