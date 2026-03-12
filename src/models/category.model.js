const { db } = require('../config/db');

class CategoryModel {
  async getAllCategories(skip, take) {
    const limit = Number(take);
    const offset = Number(skip);

    const [categories] = await db.query(
      `SELECT id, name, image_name, image_path, status, created_at
       FROM category ORDER BY id DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    const [countResult] = await db.query(`SELECT COUNT(*) as total FROM category`);
    return { categories, total: countResult[0].total };
  }

  async findCategoryById(id) {
    const [rows] = await db.query(
      `SELECT id, name, image_name, image_path, status, created_at FROM category WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async createCategory(data) {
    const { name, imageName, imagePath, status } = data;
    const [result] = await db.query(
      `INSERT INTO category (name, image_name, image_path, status) VALUES (?, ?, ?, ?)`,
      [name, imageName, imagePath, status]
    );
    return result;
  }

  async updateCategory(id, data) {
    const { name, imageName, imagePath, status } = data;
    const [result] = await db.query(
      `UPDATE category SET name = ?, image_name = ?, image_path = ?, status = ?, updated_at = NOW() WHERE id = ?`,
      [name, imageName, imagePath, status, id]
    );
    return result;
  }

  async deleteCategory(id) {
    const [result] = await db.query(`DELETE FROM category WHERE id = ?`, [id]);
    return result;
  }
}

module.exports = new CategoryModel();
