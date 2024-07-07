const express = require('express');
const router = express.Router();
const EtudiantController = require('../controllers/EtudiantController');
const verifyToken = require('../middlewares/verifyToken'); 

router.post('/checkNumEtudiant', verifyToken, EtudiantController.checkNumEtudiant);
router.post('/hasParent', verifyToken, EtudiantController.hasParent);
router.get('/etudiantsByFiliere/:id_filiere/:semestre', verifyToken, EtudiantController.getAllEtudiantsByFiliere)
router.post('/getEtudiantsWithNotes', verifyToken, EtudiantController.getAllEtudiantsWithNotes);

module.exports = router;
