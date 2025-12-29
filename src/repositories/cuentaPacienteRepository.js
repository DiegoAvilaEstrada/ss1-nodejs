const db = require('../config/database');

class CuentaPacienteRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT cp.*, p.dpi, p.nombre, p.apellido, p.telefono, p.email, p.nit
      FROM cuenta_paciente cp
      LEFT JOIN paciente p ON cp.dpi_paciente = p.dpi
    `);
    return rows;
  }

  async findById(username) {
    const [rows] = await db.query(`
      SELECT cp.*, p.dpi, p.nombre, p.apellido, p.telefono, p.email, p.nit
      FROM cuenta_paciente cp
      LEFT JOIN paciente p ON cp.dpi_paciente = p.dpi
      WHERE cp.username = ?
    `, [username]);
    return rows[0];
  }

  async create(cuentaPaciente) {
    await db.query(
      'INSERT INTO cuenta_paciente (username, password, dpi_paciente) VALUES (?, ?, ?)',
      [cuentaPaciente.username, cuentaPaciente.password, cuentaPaciente.dpiPaciente]
    );
  }

  async update(cuentaPaciente) {
    await db.query(
      'UPDATE cuenta_paciente SET password = ? WHERE username = ?',
      [cuentaPaciente.password, cuentaPaciente.username]
    );
  }
}

module.exports = new CuentaPacienteRepository();

