const express = require('express');
const router = express.Router();
const ChatBotController = require('../controllers/chatBotController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/getResponse', verifyToken, ChatBotController.getReponse)
module.exports = router;
