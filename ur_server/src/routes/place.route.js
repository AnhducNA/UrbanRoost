const express = require('express');
const router = express.Router();
const placesController = require("../controllers/place.controller");

router.get('/', placesController.getPlaces);
router.post('/', placesController.store);
router.get('/:placeId', placesController.detail);

module.exports = router
