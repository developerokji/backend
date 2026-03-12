const localityModel = require('../models/locality.model');
const ApiError = require('../utils/ApiError');

class LocalityService {
  async getLocality(skip, take) {
    return localityModel.getLocality(skip, take);
  }
  async createLocality(stateId, cityId, localityName) {
    return localityModel.createLocality(stateId, cityId, localityName);
  }
  async updateLocality(id, stateId, cityId, localityName) {
    const existing = await localityModel.getLocalityById(id);
    if (!existing) {
      throw new ApiError(404, 'Locality not found');
    }
    const finalStateId = stateId ?? existing.state_id;
    const finalCityId = cityId ?? existing.city_id;
    const finalLocalityName = localityName ?? existing.locality_name;
    return localityModel.updateLocality(id, finalStateId, finalCityId, finalLocalityName);
  }
  async deleteLocality(id) {
    const existing = await localityModel.getLocalityById(id);
    if (!existing) {
      throw new ApiError(404, 'Locality not found');
    }
    return localityModel.deleteLocality(id);
  }
}

module.exports = new LocalityService();
