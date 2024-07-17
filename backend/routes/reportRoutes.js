const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController');
const verifyToken = require('../middlewares/verifyToken'); 

router.get('/getReports', verifyToken, ReportController.getReports)

module.exports = router;
