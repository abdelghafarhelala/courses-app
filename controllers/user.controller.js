const asyncWrapper = require("../middelwares/asyncWrapper");
const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusText');
const bcrypt = require('bcrypt');
const jwtHelper = require('../utils/jwtHelper');
const { validationResult } = require("express-validator");
const getAllUsers = asyncWrapper(async (req, res) => {
  
    const query = req.query;
    const limit = parseInt(query.limit) || 2;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;
    const user = await User.find({}, { __v: 0,password: 0 }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: user });
});

const login = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({ statusCode: 400, status: httpStatusText.FAIL, message: "Validation failed", data: errors.array() });
    }
    const { email, password } = req.body;
   
    
    const user = await User.findOne({ email }, { __v: 0, });
    if (!user) {
        return next({ statusCode: 401, status: httpStatusText.FAIL, message: "Invalid email or password", data: null });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next({ statusCode: 401, status: httpStatusText.FAIL, message: "Invalid email or password", data: null });
    }
    const token = jwtHelper(email,user._id);
    res.json({ status: httpStatusText.SUCCESS, message: "Login successful", data: {user:user, token:token } });
});

const register = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next({ statusCode: 400, status: httpStatusText.FAIL, message: "Validation failed", data: errors.array() });
        }
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        next({ statusCode: 400, status: httpStatusText.FAIL, message: "Email already exists", data: null });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword});
    const token = jwtHelper(email,user._id);
    user.token = token;
    await user.save();
    res.json({ status: httpStatusText.SUCCESS, message: "Registration successful", data: {user:user, token:token } });
});

module.exports = {
    getAllUsers,
    login,
    register
}