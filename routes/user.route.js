const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validationSchema = require('../middelwares/validationSchema');
const multer  = require('multer')
const fileStorage = require('../utils/fileStorage'); 


const upload = multer({ storage: fileStorage });

router
    .route('/')
    .get(userController.getAllUsers)

router
    .post('/login',validationSchema.loginValidationSchema(), userController.login);
router
    .post('/register', upload.single('avatar'), validationSchema.registerUserValidationSchema(), userController.register);


module.exports = router;