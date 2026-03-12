const subCategoryModel = require('../models/sub-category.model');
const ApiError = require('../utils/ApiError');

class SubCategoryService {
  async getAllSubCategories(skip, take, categoryId) {
    return subCategoryModel.getAllSubCategories(skip, take, categoryId);
  }

  async getSubCategoryById(id) {
    const subCategory = await subCategoryModel.findSubCategoryById(id);
    if (!subCategory) throw new ApiError(404, 'Sub-category not found');
    return subCategory;
  }

  async createSubCategory(fields) {
    return subCategoryModel.createSubCategory({
      name:        fields.name,
      imageName:  fields.imageName,
      imagePath:  fields.imagePath,
      status:      fields.status,
      categoryId: fields.categoryId,
    });
  }

  async updateSubCategory(id, fields) {
    const existing = await subCategoryModel.findSubCategoryById(id);
    if (!existing) throw new ApiError(404, 'Sub-category not found');

    const merged = {
      name:        fields.name        ?? existing.name,
      imageName:  fields.imageName   ?? existing.image_name,
      imagePath:  fields.imagePath   ?? existing.image_path,
      status:      fields.status      ?? existing.status,
      categoryId: fields.categoryId  ?? existing.category_id,
    };

    await subCategoryModel.updateSubCategory(id, merged);
    return subCategoryModel.findSubCategoryById(id);
  }

  async deleteSubCategory(id) {
    const existing = await subCategoryModel.findSubCategoryById(id);
    if (!existing) throw new ApiError(404, 'Sub-category not found');
    return subCategoryModel.deleteSubCategory(id);
  }
}

module.exports = new SubCategoryService();
