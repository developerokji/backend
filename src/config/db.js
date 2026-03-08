const mysql = require('mysql2/promise');
const logger = require('../utils/logger');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'myapp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    logger.info('MySQL Database connected successfully');
    connection.release();
  } catch (error) {
    logger.error('Database connection failed', error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await pool.end();
};

module.exports = {
  db: pool,
  connectDB,
  disconnectDB,
};
