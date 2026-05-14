const httpStatusText = require('../utils/httpStatusText');
module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next({ statusCode: 403, status: httpStatusText.FAIL, message: 'You are not allowed to access this route.', data: null });
        }
        next();
    }
}