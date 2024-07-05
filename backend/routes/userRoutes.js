const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const verifyToken = require('../middlewares/verifyToken'); 

router.get('/getUsers',verifyToken, UserController.getUsers);
router.get('/:id', verifyToken, UserController.getUserById);
router.post('/login', UserController.login);
router.post('/checkEmail', verifyToken, UserController.checkEmail);
router.post('/createUser', UserController.createNewUser);

module.exports = router;
