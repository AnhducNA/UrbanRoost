const express = require('express');
const router = express.Router();
const placesController = require("../controllers/place.controller");

router.get('/', placesController.getPlaceList);
router.get('/search_advanced', placesController.getPlaceListBySearchAdvanced);
router.get('/:placeId', placesController.getPlaceById);
router.get('/:placeId/rate', placesController.getRateAboutPlaceId);
router.get('/:placeId/image', placesController.getImageByPlaceId);
router.get('/:placeId/category', placesController.getCategoryByPlaceId);
router.post('/', placesController.placeNew);
router.put('/update', placesController.placeUpdate);
module.exports = router
