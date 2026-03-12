const cityService = require('../services/city.service');
const { sendSuccess } = require('../utils/responseFormatter');

class CityController {
  async getCityByState(req, res, next) {
    try {
      const { stateId } = req.query;
      const { cities } = await cityService.getCityByState(stateId);
      sendSuccess(res, 200, 'Cities fetched successfully', cities);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CityController();
