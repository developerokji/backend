const morgan = require('morgan');
const logger = require('../utils/logger');

// Define a custom morgan format that includes the request ID
morgan.token('reqId', (req) => req.id || '');

const morganFormat = process.env.NODE_ENV === 'production' 
  ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" [ReqID: :reqId] - :response-time ms'
  : ':method :url :status :response-time ms - :res[content-length] [ReqID: :reqId]';

// Create the morgan middleware, using winston to output the stream
const requestLoggerMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      // Remove trailing newlines since Winston adds them
      logger.info(message.trim());
    },
  },
});

module.exports = {
  requestLoggerMiddleware,
};
