const express = require('express');
const router = express.Router();
const ParentController = require('../controllers/parentController');
const verifyToken = require('../middlewares/verifyToken'); 

router.post('/parentEtudiants', verifyToken, ParentController.getAllParentEtudiants);

module.exports = router;
