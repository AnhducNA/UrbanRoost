const express = require('express');
const router = express.Router();
const placesController = require("../controllers/place.controller");

router.get('/', placesController.getPlaces);

module.exports = router