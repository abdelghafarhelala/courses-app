
const Course = require('../models/course.model');
const {validationResult} = require('express-validator');

 const getAllCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
};

const createCourse = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(validationResult(req).errors);
        return res.status(400).json(errors.array());
    }
    const newCourse = new Course(req.body);
    const result =await newCourse.save();
    if(!result){
        return res.status(400).json({message:"Error creating course"});
    }
    res.status(201).json(result);
}
const getCourse = async (req, res) => {
   try {
     const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
   return  res.json(course);
   } catch (error) {
    return res.status(400).json({ message: "Invalid course ID" });
   }
}
const updateCourse = async (req, res) => {
   try {
     const course = await Course.findByIdAndUpdate(req.params.id, req.body);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    return res.json(course);
   } catch (error) {
   return res.status(400).json({ message: "Invalid course ID" });
   }
}
const deleteCourse = async (req, res) => {
   try {
     const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    return res.json({ message: 'Course deleted successfully' });
   } catch (error) {
    return res.status(400).json({ message: "Invalid course ID" });
   }
}

module.exports = {
    getAllCourses,
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse
}

