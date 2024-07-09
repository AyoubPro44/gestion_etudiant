const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const verifyToken = require('../middlewares/verifyToken'); 

router.get('/getPosts', verifyToken, PostController.getPosts);

module.exports = router;
