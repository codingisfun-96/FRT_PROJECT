const express= require("express");
const router = express.Router();
const passwordController = require("../controllers/password");
const db= require('../config/database')

router.post('/add-password',passwordController.add_password);
router.post('/view-password',passwordController.view_password);
router.post('/delete-password',passwordController.delete_password);
router.get('/load-data-password',passwordController.load_data_password);
router.post('/check-password',passwordController.check_password);
router.post('/update-password',passwordController.update_password);


module.exports = router;