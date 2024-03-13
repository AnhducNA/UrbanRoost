const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post('/login', authController.authLogin);
router.post('/register', authController.authRegister);
router.post('/forgotPassword', authController.authForgotPassword);
module.exports = router
