const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validationSchema = require('../middelwares/validationSchema');


router
    .route('/')
    .get(userController.getAllUsers)

router
    .route('/login')
    .post(validationSchema.loginValidationSchema(), userController.login);
router
    .route('/register')
    .post(validationSchema.registerUserValidationSchema(), userController.register);


module.exports = router;