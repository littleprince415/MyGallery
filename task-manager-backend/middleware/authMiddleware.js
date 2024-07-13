// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports = async function(req, res, next) {
    // Get token from header
    const token = req.header('Authorization');

    // Check if not token
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token.replace('Bearer ', ''), config.get('jwtSecret'));

        // Add user from payload
        req.user = await User.findById(decoded.userId).select('-password');

        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
