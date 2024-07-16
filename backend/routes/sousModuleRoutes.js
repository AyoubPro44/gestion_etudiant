const express = require('express');
const router = express.Router();
const SousModuleController = require('../controllers/sousModuleController');
const verifyToken = require('../middlewares/verifyToken'); 

router.get('/getSousModuleFiliere', verifyToken, SousModuleController.getSousModuleFiliere);
router.post('/addSousModule', verifyToken, SousModuleController.addSousModule)
router.delete('/deleteSousModule/:id_sous_module', verifyToken, SousModuleController.deleteSousModule)
router.post('/updateSousModule', verifyToken, SousModuleController.updateSousModule)

module.exports = router;
