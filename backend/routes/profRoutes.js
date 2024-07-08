const express = require('express');
const router = express.Router();
const ProfController = require('../controllers/ProfController');
const verifyToken = require('../middlewares/verifyToken'); 

router.post('/getProfCourses', verifyToken, ProfController.getCourses);
router.post('/updateProfInfos', verifyToken, ProfController.updateProfInfos);
router.post('/profEnseignements', verifyToken, ProfController.getProfEnseignements);
router.post('/saveReport', verifyToken, ProfController.insertReport);

module.exports = router;
