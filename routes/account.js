const express= require("express");
const router = express.Router();
const accountController = require("../controllers/account");
const db= require('../config/database')

router.get('/load-account',accountController.load_account);

module.exports = router;