const express = require('express');
const router = express.Router();
const FiliereController = require('../controllers/FiliereController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/getFilieres', verifyToken, FiliereController.getFilieres)
router.post('/filiereProgram', verifyToken, FiliereController.getFiliereProgram)
router.get('/filiereYears/:id_filiere', verifyToken, FiliereController.getFiliereNbModule)
router.get('/filieresInfos', verifyToken, FiliereController.getFilieresInfos)
router.get('/filiereById/:id_filiere', verifyToken, FiliereController.getFiliereById)
router.post('/updateFiliereName', verifyToken, FiliereController.updateFiliereName)
router.get('/filiereSemestres/:id_filiere', verifyToken, FiliereController.getFiliereSemestres)
router.post('/updatePlanning', verifyToken, FiliereController.uploadMiddleware(), FiliereController.updatePlanning);
router.get('/modulesFiliere/:id_filiere', verifyToken, FiliereController.getModulesFiliere)

module.exports = router;
