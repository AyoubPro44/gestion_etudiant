const express = require('express');
const router = express.Router();
const ParentController = require('../controllers/parentController');
const verifyToken = require('../middlewares/verifyToken'); 

router.post('/parentEtudiants', verifyToken, ParentController.getAllParentEtudiants);
router.post('/updateParentInfos', verifyToken, ParentController.updateParentInfos);
router.post('/removeParent', verifyToken, ParentController.removeParent);
router.post('/addParent', verifyToken, ParentController.addParent);

module.exports = router;
