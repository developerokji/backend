const cityModel = require('../models/city.model');
const ApiError = require('../utils/ApiError');

class CityService {
  async getCityByState(stateId) {
    if (!stateId) {
      throw new ApiError(400, 'stateId query parameter is required');
    }
    return cityModel.getCityByState(stateId);
  }
}

module.exports = new CityService();
