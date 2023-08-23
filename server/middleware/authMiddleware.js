// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization').trim();

    if (!token) {
        res.status(401).json({ error: 'Token missing, authorization denied' });
    }else{
        try {
            const decoded = jwt.verify(token, 'secretKey');
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token is not valid' });
        }
    }

    
};
