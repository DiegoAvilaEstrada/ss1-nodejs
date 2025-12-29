const db = require('../config/database');

class SesionPsicologicaRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT sp.*, t.id as tratamiento_id
      FROM sesion_psicologica sp
      LEFT JOIN tratamiento t ON sp.id_tratamiento = t.id
    `);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT sp.*, t.id as tratamiento_id
      FROM sesion_psicologica sp
      LEFT JOIN tratamiento t ON sp.id_tratamiento = t.id
      WHERE sp.id = ?
    `, [id]);
    return rows[0];
  }

  async create(sesion) {
    const [result] = await db.query(
      'INSERT INTO sesion_psicologica (id_tratamiento, fecha_sesion, observaciones) VALUES (?, ?, ?)',
      [sesion.idTratamiento, sesion.fechaSesion, sesion.observaciones]
    );
    return result.insertId;
  }
}

module.exports = new SesionPsicologicaRepository();

