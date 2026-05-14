const jwt = require('jsonwebtoken')
const User = require('../models/user.model');

const generateToken = (user) => {
    const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

module.exports = generateToken;