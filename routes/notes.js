const express= require("express");
const router = express.Router();
const notesController = require("../controllers/notes");
const db= require('../config/database')


router.get('/load-data-notes',notesController.load_data_notes);
router.post('/add-notes',notesController.add_notes);
router.post('/view-notes',notesController.view_notes);
router.post('/update-notes',notesController.update_notes);
router.post('/delete-notes',notesController.delete_notes);


module.exports = router;