const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'yamanote.proxy.rlwy.net',
  port: process.env.DB_PORT || 38333,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'DcxqZiFSGFqRYmmxQYpHIlSztezmwTYg',
  database: process.env.DB_NAME || 'psi_firm',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = pool;

