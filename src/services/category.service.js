const categoryModel = require('../models/category.model');
const ApiError = require('../utils/ApiError');

class CategoryService {
  async getAllCategories(skip, take) {
    return categoryModel.getAllCategories(skip, take);
  }

  async getCategoryById(id) {
    const category = await categoryModel.findCategoryById(id);
    if (!category) throw new ApiError(404, 'Category not found');
    return category;
  }

  async createCategory(fields) {
    return categoryModel.createCategory({
      name:       fields.name,
      imageName: fields.imageName,
      imagePath: fields.imagePath,
      status:     fields.status,
    });
  }

  async updateCategory(id, fields) {
    const existing = await categoryModel.findCategoryById(id);
    if (!existing) throw new ApiError(404, 'Category not found');

    const merged = {
      name:       fields.name       ?? existing.name,
      imageName: fields.imageName  ?? existing.image_name,
      imagePath: fields.imagePath  ?? existing.image_path,
      status:     fields.status     ?? existing.status,
    };

    await categoryModel.updateCategory(id, merged);
    return categoryModel.findCategoryById(id);
  }

  async deleteCategory(id) {
    const existing = await categoryModel.findCategoryById(id);
    if (!existing) throw new ApiError(404, 'Category not found');
    return categoryModel.deleteCategory(id);
  }
}

module.exports = new CategoryService();
