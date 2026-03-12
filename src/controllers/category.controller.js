const categoryService = require('../services/category.service');
const storageService = require('../services/storage.service');
const { sendSuccess } = require('../utils/responseFormatter');
const ApiError = require('../utils/ApiError');
const { getPaginationOptions, formatPaginatedResponse } = require('../utils/pagination');

class CategoryController {
  async getAllCategories(req, res, next) {
    try {
      const { page, limit } = req.query;
      const { skip, take, page: pageNum, limit: limitNum } = getPaginationOptions(page, limit);
      const { categories, total } = await categoryService.getAllCategories(skip, take);
      sendSuccess(res, 200, 'Categories fetched successfully', formatPaginatedResponse(categories, total, pageNum, limitNum));
    } catch (error) { next(error); }
  }

  async getCategoryById(req, res, next) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      sendSuccess(res, 200, 'Category fetched successfully', category);
    } catch (error) { next(error); }
  }

  async createCategory(req, res, next) {
    try {
      if (!req.file) throw new ApiError(400, 'Category image is required');
      const { name, status } = req.body;
      const imagePath = await storageService.processUpload(req.file, 'categories');

      const category = await categoryService.createCategory({
        name,
        imageName: req.file.filename,
        imagePath,
        status,
      });
      sendSuccess(res, 201, 'Category created successfully', category);
    } catch (error) { next(error); }
  }

  async updateCategory(req, res, next) {
    try {
      const { name, status } = req.body;
      const imagePath = req.file ? await storageService.processUpload(req.file, 'categories') : null;

      const category = await categoryService.updateCategory(req.params.id, {
        name,
        imageName: req.file ? req.file.filename : null,
        imagePath,
        status,
      });
      sendSuccess(res, 200, 'Category updated successfully', category);
    } catch (error) { next(error); }
  }

  async deleteCategory(req, res, next) {
    try {
      await categoryService.deleteCategory(req.params.id);
      sendSuccess(res, 200, 'Category deleted successfully', null);
    } catch (error) { next(error); }
  }
}

module.exports = new CategoryController();
