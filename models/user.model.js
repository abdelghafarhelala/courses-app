const mongoose = require('mongoose');
const { validate } = require('./course.model');
const userRoles = require('../utils/userRoles');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    password: {
        type: String,
        required: true,
    },
    token : {
        type: String,
    },
    role : {
        type: String,
        enum: [userRoles.ADMIN, userRoles.USER, userRoles.MANGER],
        default: userRoles.USER,
    },
    avatar: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model('User', userSchema);