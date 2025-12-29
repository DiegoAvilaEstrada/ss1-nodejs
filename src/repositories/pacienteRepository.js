const db = require('../config/database');

class PacienteRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM paciente');
    return rows;
  }

  async findById(dpi) {
    const [rows] = await db.query('SELECT * FROM paciente WHERE dpi = ?', [dpi]);
    return rows[0];
  }

  async create(paciente) {
    await db.query(
      'INSERT INTO paciente (dpi, nombre, apellido, telefono, email, nit) VALUES (?, ?, ?, ?, ?, ?)',
      [paciente.dpi, paciente.nombre, paciente.apellido, paciente.telefono, paciente.email, paciente.nit]
    );
  }

  async update(paciente) {
    await db.query(
      'UPDATE paciente SET nombre = ?, apellido = ?, telefono = ?, email = ?, nit = ? WHERE dpi = ?',
      [paciente.nombre, paciente.apellido, paciente.telefono, paciente.email, paciente.nit, paciente.dpi]
    );
  }

  async delete(dpi) {
    await db.query('DELETE FROM paciente WHERE dpi = ?', [dpi]);
  }
}

module.exports = new PacienteRepository();

