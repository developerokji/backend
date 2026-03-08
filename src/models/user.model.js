const { db } = require('../config/db');
const crypto = require('crypto');

class UserModel {
  async createUser(userData) {
    const id = crypto.randomUUID();
    const role = userData.role || 'USER';
    
    // We use raw queries here
    const [result] = await db.query(
      `INSERT INTO User (id, email, password, name, role, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [id, userData.email, userData.password, userData.name, role]
    );

    // After insert, fetch and return the newly created user without password if preferred
    // But for simplicity, returning what is essentially created
    return {
      id,
      email: userData.email,
      name: userData.name,
      role,
      createdAt: new Date()
    };
  }

  async findUserByEmail(email) {
    const [rows] = await db.query(`SELECT * FROM User WHERE email = ? LIMIT 1`, [email]);
    return rows.length > 0 ? rows[0] : null;
  }

  async findUserById(id) {
    const [rows] = await db.query(
      `SELECT id, email, name, role, createdAt FROM User WHERE id = ? LIMIT 1`, 
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async getUsers(skip, take) {
    // Note: limit and offset should be passed properly
    const limit = Number(take);
    const offset = Number(skip);
    
    const [users] = await db.query(
      `SELECT id, email, name, role, createdAt FROM User LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    
    const [countResult] = await db.query(`SELECT COUNT(*) as total FROM User`);
    const total = countResult[0].total;

    return { users, total };
  }
}

module.exports = new UserModel();
