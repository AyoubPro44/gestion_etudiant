const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/getPosts', verifyToken, PostController.getPosts);
router.post('/newPost', verifyToken, PostController.uploadMiddleware(), PostController.createPost);
router.post('/deletePost', verifyToken, PostController.deletePost);
router.post('/updatePost', verifyToken, PostController.uploadMiddleware(), PostController.updatePost);

module.exports = router;
