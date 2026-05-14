const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText');
exports.checkToken = (req, res, next) => {
  const jwtToken = req.headers.authorization;
  if (!jwtToken) {
    return next({statusCode: 401, status: httpStatusText.FAIL, message: 'No token provided.', data: null });
  }
    try {
        const token = jwtToken.split(' ')[1]; // Assuming the token is in the format "Bearer
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
    } catch (error) {
      return next({statusCode: 401, status: httpStatusText.FAIL, message: 'Invalid token.', data: null });
    }
  next();
};