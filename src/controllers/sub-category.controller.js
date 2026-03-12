const subCategoryService = require('../services/sub-category.service');
const storageService = require('../services/storage.service');
const { sendSuccess } = require('../utils/responseFormatter');
const ApiError = require('../utils/ApiError');
const { getPaginationOptions, formatPaginatedResponse } = require('../utils/pagination');

class SubCategoryController {
  async getAllSubCategories(req, res, next) {
    try {
      const { page, limit, categoryId } = req.query;
      const { skip, take, page: pageNum, limit: limitNum } = getPaginationOptions(page, limit);
      const { subCategories, total } = await subCategoryService.getAllSubCategories(skip, take, categoryId);
      sendSuccess(res, 200, 'Sub-categories fetched successfully', formatPaginatedResponse(subCategories, total, pageNum, limitNum));
    } catch (error) { next(error); }
  }

  async getSubCategoryById(req, res, next) {
    try {
      const subCategory = await subCategoryService.getSubCategoryById(req.params.id);
      sendSuccess(res, 200, 'Sub-category fetched successfully', subCategory);
    } catch (error) { next(error); }
  }

  async createSubCategory(req, res, next) {
    try {
      if (!req.file) throw new ApiError(400, 'Sub-category image is required');
      const { name, categoryId, status } = req.body;
      const imagePath = await storageService.processUpload(req.file, 'sub-categories');

      const subCategory = await subCategoryService.createSubCategory({
        name,
        imageName:  req.file.filename,
        imagePath,
        status,
        categoryId,
      });
      sendSuccess(res, 201, 'Sub-category created successfully', subCategory);
    } catch (error) { next(error); }
  }

  async updateSubCategory(req, res, next) {
    try {
      const { name, categoryId, status } = req.body;
      const imagePath = req.file ? await storageService.processUpload(req.file, 'sub-categories') : null;

      const subCategory = await subCategoryService.updateSubCategory(req.params.id, {
        name,
        imageName:  req.file ? req.file.filename : null,
        imagePath,
        status,
        categoryId,
      });
      sendSuccess(res, 200, 'Sub-category updated successfully', subCategory);
    } catch (error) { next(error); }
  }

  async deleteSubCategory(req, res, next) {
    try {
      await subCategoryService.deleteSubCategory(req.params.id);
      sendSuccess(res, 200, 'Sub-category deleted successfully', null);
    } catch (error) { next(error); }
  }
}

module.exports = new SubCategoryController();
