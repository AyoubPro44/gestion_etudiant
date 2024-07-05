const express = require('express');
const router = express.Router();
const FiliereController = require('../controllers/FiliereController');
const verifyToken = require('../middlewares/verifyToken'); 

router.get('/getFilieres', verifyToken, FiliereController.getFilieres);

module.exports = router;
