const { db } = require('../config/db');

class SubCategoryModel {
  async getAllSubCategories(skip, take, categoryId) {
    const limit = Number(take);
    const offset = Number(skip);

    let query = `SELECT id, name, image_name, image_path, status, category_id, created_at FROM sub_category`;
    const params = [];

    if (categoryId) {
      query += ` WHERE category_id = ?`;
      params.push(categoryId);
    }

    query += ` ORDER BY id DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [subCategories] = await db.query(query, params);

    const countQuery = categoryId
      ? `SELECT COUNT(*) as total FROM sub_category WHERE category_id = ?`
      : `SELECT COUNT(*) as total FROM sub_category`;
    const [countResult] = await db.query(countQuery, categoryId ? [categoryId] : []);

    return { subCategories, total: countResult[0].total };
  }

  async findSubCategoryById(id) {
    const [rows] = await db.query(
      `SELECT id, name, image_name, image_path, status, category_id, created_at FROM sub_category WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async createSubCategory(data) {
    const { name, imageName, imagePath, status, categoryId } = data;
    const [result] = await db.query(
      `INSERT INTO sub_category (name, image_name, image_path, status, category_id) VALUES (?, ?, ?, ?, ?)`,
      [name, imageName, imagePath, status, categoryId]
    );
    return result;
  }

  async updateSubCategory(id, data) {
    const { name, imageName, imagePath, status, categoryId } = data;
    const [result] = await db.query(
      `UPDATE sub_category SET name = ?, image_name = ?, image_path = ?, status = ?, category_id = ?, updated_at = NOW() WHERE id = ?`,
      [name, imageName, imagePath, status, categoryId, id]
    );
    return result;
  }

  async deleteSubCategory(id) {
    const [result] = await db.query(`DELETE FROM sub_category WHERE id = ?`, [id]);
    return result;
  }
}

module.exports = new SubCategoryModel();
