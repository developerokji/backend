const { db } = require('../config/db');

class LocalityModel {
  async getLocality(skip, take) {
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
  async createLocality(stateId, cityId, localityName) {
    const [result] = await db.query(
      `INSERT INTO localities (state_id, city_id, locality_name) VALUES (?, ?, ?)`,
      [stateId, cityId, localityName],
    );
    return { id: result.insertId, stateId, cityId, localityName };
  }
  async getLocalityById(id) {
    const [rows] = await db.query(`SELECT * FROM localities WHERE id = ?`, [id]);
    return rows[0];
  }
  async updateLocality(id, stateId, cityId, localityName) {
    await db.query(
      `UPDATE localities SET state_id = ?, city_id = ?, locality_name = ? WHERE id = ?`,
      [stateId, cityId, localityName, id],
    );
    return { id, stateId, cityId, localityName };
  }
  async deleteLocality(id) {
    await db.query(`DELETE FROM localities WHERE id = ?`, [id]);
    return { id };
  }
}

module.exports = new LocalityModel();
