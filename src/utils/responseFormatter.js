const sendSuccess = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    error: null,
  });
};

const sendError = (res, statusCode, message, errorDetails = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error: errorDetails,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
