const db = require('../config/database');

class RolRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM rol_empleado');
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM rol_empleado WHERE id = ?', [id]);
    return rows[0];
  }

  async create(rol) {
    const [result] = await db.query(
      'INSERT INTO rol_empleado (nombre_rol) VALUES (?)',
      [rol.rol]
    );
    return result.insertId;
  }
}

module.exports = new RolRepository();

