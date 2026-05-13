
const Course = require('../models/course.model');
const { validationResult } = require('express-validator');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middelwares/asyncWrapper');

const getAllCourses = asyncWrapper(async (req, res) => {
    const query = req.query;
    const limit = parseInt(query.limit) || 2;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;
    const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: courses });
});

const createCourse = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({ statusCode: 400, status: httpStatusText.FAIL, message: "Validation failed", data: errors.array() });
    }
    const newCourse = new Course(req.body);
    const result = await newCourse.save();
    if (!result) {
        return next({ status: httpStatusText.FAIL, message: "Course creation failed", data: null });
    }
    res.status(201).json({ status: httpStatusText.SUCCESS, message: "Course created successfully", data: result });
});

const getCourse = asyncWrapper(async (req, res) => {
    const course = await Course.findById(req.params.id, { __v: 0 });
    if (!course) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: "Course not found", data: null });
    }
    return res.json({ status: httpStatusText.SUCCESS, data: course });
});

const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body);
        if (!course) {
            return res.status(404).json({ status: httpStatusText.FAIL, message: "Course not found", data: null });
        }
        return res.json({ status: httpStatusText.SUCCESS, data: null, message: "Course updated successfully" });
    } catch (error) {
        return res.status(400).json({ status: httpStatusText.ERROR, message: error.message, data: null });
    }
}
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ status: httpStatusText.FAIL, message: "Course not found", data: null });
        }
        return res.json({ status: httpStatusText.SUCCESS, message: "Course deleted successfully", data: null });
    } catch (error) {
        return res.status(400).json({ status: httpStatusText.ERROR, message: error.message, data: null });
    }
}

module.exports = {
    getAllCourses,
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse
}

