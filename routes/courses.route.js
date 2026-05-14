const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const validationSchema = require('../middelwares/validationSchema');
const { checkToken } = require('../middelwares/checkToken');
const allowedTo = require('../middelwares/allowedTo');
const userRoles = require('../utils/userRoles');

router
    .route('/')
    .get(checkToken, courseController.getAllCourses)
    .post(validationSchema.validationSchema(),
        checkToken, allowedTo(userRoles.ADMIN, userRoles.MANGER), courseController.createCourse);

router
    .route('/:id')
    .get( checkToken, courseController.getCourse)
    .patch(checkToken, allowedTo(userRoles.ADMIN), courseController.updateCourse)
    .delete(checkToken, allowedTo(userRoles.ADMIN), courseController.deleteCourse);


module.exports = router;