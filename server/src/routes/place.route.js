const express = require('express');
const router = express.Router();
const placesController = require("../controllers/place.controller");

router.get('/', placesController.getPlaceList);
router.get('/:placeId', placesController.getPlaceById);
router.get('/:placeId/rate', placesController.getRateAboutPlaceId);
router.post('/', placesController.createPlace);
module.exports = router
