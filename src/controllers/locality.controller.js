const localityService = require('../services/locality.service');
const { sendSuccess } = require('../utils/responseFormatter');
const { getPaginationOptions, formatPaginatedResponse } = require('../utils/pagination');

class LocalityController {
  async getLocality(req, res, next) {
    try {
      const { page, limit } = req.query;
      const { skip, take, page: pageNum, limit: limitNum } = getPaginationOptions(page, limit);

      const { stories, total } = await localityService.getLocality(skip, take);

      const paginatedData = formatPaginatedResponse(stories, total, pageNum, limitNum);
      sendSuccess(res, 200, 'Locality fetched successfully', paginatedData);
    } catch (error) {
      next(error);
    }
  }
  async createLocality(req, res, next) {
    try {
      const { stateId, cityId, localityName } = req.body;
      const locality = await localityService.createLocality(stateId, cityId, localityName);
      sendSuccess(res, 201, 'Locality created successfully', locality);
    } catch (error) {
      next(error);
    }
  }
  async updateLocality(req, res, next) {
    try {
      const { id } = req.params;
      const { stateId, cityId, localityName } = req.body;

      const locality = await localityService.updateLocality(id, stateId, cityId, localityName);
      sendSuccess(res, 200, 'Locality updated successfully', locality);
    } catch (error) {
      next(error);
    }
  }
  async deleteLocality(req, res, next) {
    try {
      const { id } = req.params;
      await localityService.deleteLocality(id);
      sendSuccess(res, 200, 'Locality deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LocalityController();
