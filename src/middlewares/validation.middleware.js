const { sendError } = require('../utils/responseFormatter');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    return sendError(res, 400, 'Validation Error', error.errors || error);
  }
};

module.exports = {
  validate,
};
