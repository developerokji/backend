const storyModel = require('../models/story.model');
const ApiError = require('../utils/ApiError');

class StoryService {
  async getStories(skip, take) {
    return storyModel.getStories(skip, take);
  }

  async createStory(image_name, image_path, status) {
    return storyModel.createStory(image_name, image_path, status);
  }

  async updateStory(id, imageName, image_path, status) {
    // Fetch the current story first
    const existing = await storyModel.findStoryById(id);
    if (!existing) {
      throw new ApiError(404, 'Story not found');
    }

    // Use incoming value if provided, otherwise fall back to existing DB value
    const finalImageName = imageName ?? existing.image_name;
    const finalImagePath = image_path ?? existing.image_path;
    const finalStatus = status ?? existing.status;

    await storyModel.updateStory(id, finalImageName, finalImagePath, finalStatus);

    // Return the updated record
    return storyModel.findStoryById(id);
  }

  async deleteStory(id) {
    const existing = await storyModel.findStoryById(id);
    if (!existing) {
      throw new ApiError(404, 'Story not found');
    }
    return storyModel.deleteStory(id);
  }
}

module.exports = new StoryService();
