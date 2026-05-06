const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const validationSchema = require('../middelwares/validationSchema');

router
    .route('/')
        .get(courseController.getAllCourses)
        .post(validationSchema(),courseController.createCourse);

router
    .route('/:id')
        .get(courseController.getCourse)
        .patch(courseController.updateCourse)
        .delete(courseController.deleteCourse);


module.exports = router;