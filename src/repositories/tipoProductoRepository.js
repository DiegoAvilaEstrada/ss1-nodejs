const db = require('../config/database');

class TipoProductoRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM tipo_producto');
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM tipo_producto WHERE id = ?', [id]);
    return rows[0];
  }

  async create(tipoProducto) {
    const [result] = await db.query(
      'INSERT INTO tipo_producto (nombre_tipo) VALUES (?)',
      [tipoProducto.nombreTipo]
    );
    return result.insertId;
  }
}

module.exports = new TipoProductoRepository();

