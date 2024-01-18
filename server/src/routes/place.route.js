const express = require('express');
const router = express.Router();
const placesController = require("../controllers/place.controller");

router.get('/', placesController.getPlaces);
router.get('/:placeId', placesController.getPlaceById);

module.exports = router
