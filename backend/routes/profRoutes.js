const express = require('express');
const router = express.Router();
const ProfController = require('../controllers/ProfController');
const verifyToken = require('../middlewares/verifyToken'); 

router.post('/getProfCourses', verifyToken, ProfController.getCourses);
router.post('/updateProfInfos', verifyToken, ProfController.updateProfInfos);
router.post('/profEnseignements', verifyToken, ProfController.getProfEnseignements);
router.post('/saveReport', verifyToken, ProfController.insertReport);
router.get('/getAllProfs', verifyToken, ProfController.getAllProfs)
router.post('/updateProfPlanning', verifyToken, ProfController.uploadMiddleware(), ProfController.updateProfPlanning);

module.exports = router;
