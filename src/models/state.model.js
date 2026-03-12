const { db } = require('../config/db');

class StateModel {
  async getState() {
    const [states] = await db.query(
      `SELECT id, name FROM states`,
    );
    return { states };
  }
}

module.exports = new StateModel();
