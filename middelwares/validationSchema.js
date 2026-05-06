const {body} = require('express-validator');

const validationSchema = ()=> {
    return [
    body('title')
        .isString()
        .withMessage('Title must be a string')
        .notEmpty()
        .withMessage('Title is required'),
    body('description')
        .isString()
        .withMessage('Description must be a string')
        .notEmpty()
        .withMessage('Description is required'),
    body('price')
        .isNumeric()
        .withMessage('Price must be a number')
        .notEmpty()
        .withMessage('Price is required'),
]
}
module.exports = validationSchema