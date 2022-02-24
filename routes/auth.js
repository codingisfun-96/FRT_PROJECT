const express= require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const db= require('../config/database')

router.post('/signup', authController.signup);
router.post('/login', authController.login);
// router.post('/forgot-password', authController.forgotpassword);
// router.get('/reset-password/:id/:token',authController.loadresetpassword);
// router.post('/reset-password/:id/:token',authController.resetpassword);


module.exports = router;