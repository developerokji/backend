const { db } = require('../config/db');

class StoryModel {
  async getStories(skip, take) {
    // Note: limit and offset should be passed properly
    const limit = Number(take);
    const offset = Number(skip);

    const [stories] = await db.query(
      `SELECT id, image_name, image_path, status, created_at FROM stories LIMIT ? OFFSET ?`,
      [limit, offset],
    );

    const [countResult] = await db.query(`SELECT COUNT(*) as total FROM stories`);
    const total = countResult[0].total;

    return { stories, total };
  }
  async createStory(imageName, imagePath, status) {
    const [result] = await db.query(
      `INSERT INTO stories (image_name, image_path, status) VALUES (?, ?, ?)`,
      [imageName, imagePath, status],
    );
    return result;
  }

  async findStoryById(id) {
    const [rows] = await db.query(
      `SELECT id, image_name, image_path, status, created_at FROM stories WHERE id = ? LIMIT 1`,
      [id],
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async updateStory(id, imageName, imagePath, status) {
    const [result] = await db.query(
      `UPDATE stories SET image_name = ?, image_path = ?, status = ? WHERE id = ?`,
      [imageName, imagePath, status, id],
    );
    return result;
  }

  async deleteStory(id) {
    const [result] = await db.query(`DELETE FROM stories WHERE id = ?`, [id]);
    return result;
  }
}

module.exports = new StoryModel();
