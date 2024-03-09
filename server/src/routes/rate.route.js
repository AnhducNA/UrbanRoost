const express = require('express');
const router = express.Router();
const rateController = require("../controllers/rate.controller");

router.get('/', rateController.getRateList);
router.get('/:rateId', rateController.getRateById);

module.exports = router;
