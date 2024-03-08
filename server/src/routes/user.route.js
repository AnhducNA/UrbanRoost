const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get('/', userController.getUserList);
router.get('/:userId', userController.getUserById);
router.get('/:userId/booking', userController.getBookingByUserId);
router.get('/:userId/place', userController.getPlaceByUserId);
router.get('/:userId/rate', userController.getRateByUserId);

module.exports = router;
