const db = require('../config/database');

class CodigoSesionPacienteRepository {
  async findByCodigo(codigo) {
    const [rows] = await db.query(`
      SELECT csp.*, cp.username, cp.dpi_paciente, p.*
      FROM codigo_sesion_paciente csp
      LEFT JOIN cuenta_paciente cp ON csp.username = cp.username
      LEFT JOIN paciente p ON cp.dpi_paciente = p.dpi
      WHERE csp.codigo = ?
    `, [codigo]);
    return rows[0];
  }

  async create(codigoSesion) {
    const [result] = await db.query(
      'INSERT INTO codigo_sesion_paciente (codigo, fecha_expiracion, username) VALUES (?, ?, ?)',
      [codigoSesion.codigo, codigoSesion.fechaExpiracion, codigoSesion.username]
    );
    return result.insertId;
  }
}

module.exports = new CodigoSesionPacienteRepository();

