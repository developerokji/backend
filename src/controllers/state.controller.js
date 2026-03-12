const stateService = require('../services/state.service');
const { sendSuccess } = require('../utils/responseFormatter');

class StateController {
  async getState(req, res, next) {
    try {
      const { states } = await stateService.getState();
      sendSuccess(res, 200, 'State fetched successfully', states);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StateController();
