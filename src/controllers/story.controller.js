const storyService = require('../services/story.service');
const storageService = require('../services/storage.service');
const { sendSuccess } = require('../utils/responseFormatter');
const ApiError = require('../utils/ApiError');
const { getPaginationOptions, formatPaginatedResponse } = require('../utils/pagination');

class StoryController {
  async getStories(req, res, next) {
    try {
      const { page, limit } = req.query;
      const { skip, take, page: pageNum, limit: limitNum } = getPaginationOptions(page, limit);
      
      const { stories, total } = await storyService.getStories(skip, take);
      
      const paginatedData = formatPaginatedResponse(stories, total, pageNum, limitNum);
      sendSuccess(res, 200, 'Stories fetched successfully', paginatedData);
    } catch (error) {
      next(error);
    }
  }
  async createStory(req, res, next) {
    try {
      if (!req.file) {
        throw new ApiError(400, 'Image file is required');
      }

      const { imageName, status } = req.body;

      // Delegate path resolving or uploading to the Storage Service
      const image_path = await storageService.processUpload(req.file, 'stories');
      
      const story = await storyService.createStory(imageName, image_path, status);
      sendSuccess(res, 201, 'Story created successfully', story);
    } catch (error) {
      next(error);
    }
  }

  async updateStory(req, res, next) {
    try {
      const { id } = req.params;
      const { imageName, status } = req.body;

      // If a new image was uploaded, get its path. Otherwise pass null so the
      // service knows to keep the existing DB path unchanged.
      const image_path = req.file
        ? await storageService.processUpload(req.file, 'stories')
        : null;

      const story = await storyService.updateStory(id, imageName, image_path, status);
      sendSuccess(res, 200, 'Story updated successfully', story);
    } catch (error) {
      next(error);
    }
  } 

  async deleteStory(req, res, next) {
    try {
      const { id } = req.params;
      
      const story = await storyService.deleteStory(id);
      sendSuccess(res, 200, 'Story deleted successfully', story);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StoryController();
