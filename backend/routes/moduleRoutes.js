const express = require('express');
const router = express.Router();
const ModuleController = require('../controllers/moduleController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/addModule', verifyToken, ModuleController.addNewModule)
router.delete('/deleteModule/:id_module', verifyToken, ModuleController.deleteModule)
router.post('/updateModule', verifyToken, ModuleController.updateModule)
router.get('/sousModules/:id_module', verifyToken, ModuleController.getSousModulesByIdModule)

module.exports = router;
