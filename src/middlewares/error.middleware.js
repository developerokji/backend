const logger = require('../utils/logger');
const { ENV } = require('../constants');
const { sendError } = require('../utils/responseFormatter');

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV !== ENV.PRODUCTION) {
    logger.error(`[${req.method}] ${req.url} >> StatusCode:: ${statusCode}, Message:: ${message}`);
    if (err.stack) {
      logger.error(err.stack);
    }
  } else {
    logger.error(`[${req.method}] ${req.url} >> StatusCode:: ${statusCode}, Message:: ${message}`);
  }

  const errorDetails = process.env.NODE_ENV === ENV.DEVELOPMENT ? err : null;
  sendError(res, statusCode, message, errorDetails);
};

module.exports = {
  errorMiddleware,
};
