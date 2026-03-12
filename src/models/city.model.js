const { db } = require('../config/db');

class CityModel {
  async getCityByState(stateId) {
    const [cities] = await db.query(
      `SELECT id, city, state_id FROM cities WHERE state_id = ?`,
      [stateId]
    );
    return { cities };
  }
}

module.exports = new CityModel();
