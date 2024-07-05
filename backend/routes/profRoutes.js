const express = require('express');
const router = express.Router();
const ProfController = require('../controllers/ProfController');
const verifyToken = require('../middlewares/verifyToken'); 

router.post('/getProfCourses', verifyToken, ProfController.getCourses);

module.exports = router;
