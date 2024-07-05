const express = require('express');
const router = express.Router();
const TokenController = require('../controllers/TokenController');

router.post('/getToken', TokenController.getToken);

module.exports = router;
