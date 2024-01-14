const Place = require('../models/place.model');
const db = require('../database');

module.exports = {
    getPlaces: async (req, res, next) => {
        try {
            const places = await Place.getPlaces();
            res.json(places);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}
