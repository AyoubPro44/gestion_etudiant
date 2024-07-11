const express = require('express');
const router = express.Router();
const FiliereController = require('../controllers/FiliereController');
const verifyToken = require('../middlewares/verifyToken'); 

router.get('/getFilieres', verifyToken, FiliereController.getFilieres);
router.post('/filiereProgram', verifyToken, FiliereController.getFiliereProgram)
router.get('/filiereYears/:id_filiere', verifyToken, FiliereController.getFiliereNbModule);

module.exports = router;
