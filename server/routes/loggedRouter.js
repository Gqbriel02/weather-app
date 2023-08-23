// routes/authRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); 


router.get('/get-auth-user', authMiddleware.verifyToken, userController.getAuthUser);


module.exports = router;
