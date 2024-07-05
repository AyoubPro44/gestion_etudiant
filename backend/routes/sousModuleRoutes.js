const express = require('express');
const router = express.Router();
const SousModuleController = require('../controllers/SousModuleController');
const verifyToken = require('../middlewares/verifyToken'); 

router.get('/getSousModuleFiliere', verifyToken, SousModuleController.getSousModuleFiliere);

module.exports = router;
