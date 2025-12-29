const db = require('../config/database');

class TratamientoRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT t.*, p.dpi as paciente_dpi, p.nombre as paciente_nombre, p.apellido as paciente_apellido,
             e.dpi as psicologo_dpi, e.nombre as psicologo_nombre, e.apellido as psicologo_apellido
      FROM tratamiento t
      LEFT JOIN paciente p ON t.id_paciente = p.dpi
      LEFT JOIN empleado e ON t.psicologo_dpi = e.dpi
    `);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT t.*, p.dpi as paciente_dpi, p.nombre as paciente_nombre, p.apellido as paciente_apellido,
             e.dpi as psicologo_dpi, e.nombre as psicologo_nombre, e.apellido as psicologo_apellido
      FROM tratamiento t
      LEFT JOIN paciente p ON t.id_paciente = p.dpi
      LEFT JOIN empleado e ON t.psicologo_dpi = e.dpi
      WHERE t.id = ?
    `, [id]);
    return rows[0];
  }

  async create(tratamiento) {
    const [result] = await db.query(
      `INSERT INTO tratamiento (id_paciente, psicologo_dpi, medicado, fecha_inicio, estado_tratamiento) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        tratamiento.idPaciente,
        tratamiento.psicologoDpi,
        tratamiento.medicado,
        tratamiento.fechaInicio,
        tratamiento.estadoTratamiento
      ]
    );
    return result.insertId;
  }
}

module.exports = new TratamientoRepository();

