// routes/authRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/register', userController.register);

router.post('/login', userController.login);

router.put('/edit-account', authMiddleware.verifyToken, userController.editAccount);


// Use the middleware in protected routes
router.get('/protected', authMiddleware.verifyToken, (req, res) => {
    // Access user information from req.user
    res.json({ message: 'You have access to this protected route', user: req.user });
});

module.exports = router;
