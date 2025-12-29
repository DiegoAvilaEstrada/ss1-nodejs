const db = require('../config/database');

class AreaRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM area');
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM area WHERE id = ?', [id]);
    return rows[0];
  }

  async create(area) {
    const [result] = await db.query(
      'INSERT INTO area (nombre_area) VALUES (?)',
      [area.nombreArea]
    );
    return result.insertId;
  }
}

module.exports = new AreaRepository();

