const db = require('../config/database');

class CodigoSesionEmpleadoRepository {
  async findByCodigo(codigo) {
    const [rows] = await db.query(`
      SELECT cse.*, ce.username, ce.dpi_empleado, e.*
      FROM codigo_sesion_empleado cse
      LEFT JOIN cuenta_empleado ce ON cse.username = ce.username
      LEFT JOIN empleado e ON ce.dpi_empleado = e.dpi
      WHERE cse.codigo = ?
    `, [codigo]);
    return rows[0];
  }

  async create(codigoSesion) {
    const [result] = await db.query(
      'INSERT INTO codigo_sesion_empleado (codigo, fecha_expiracion, username) VALUES (?, ?, ?)',
      [codigoSesion.codigo, codigoSesion.fechaExpiracion, codigoSesion.username]
    );
    return result.insertId;
  }
}

module.exports = new CodigoSesionEmpleadoRepository();

