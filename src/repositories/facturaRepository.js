const db = require('../config/database');

class FacturaRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT f.*, p.dpi as paciente_dpi, p.nombre as paciente_nombre, p.apellido as paciente_apellido,
             t.id as tratamiento_id
      FROM factura f
      LEFT JOIN paciente p ON f.dpi_paciente = p.dpi
      LEFT JOIN tratamiento t ON f.id_tratamiento = t.id
    `);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT f.*, p.dpi as paciente_dpi, p.nombre as paciente_nombre, p.apellido as paciente_apellido,
             t.id as tratamiento_id
      FROM factura f
      LEFT JOIN paciente p ON f.dpi_paciente = p.dpi
      LEFT JOIN tratamiento t ON f.id_tratamiento = t.id
      WHERE f.id = ?
    `, [id]);
    return rows[0];
  }

  async findByPacienteDpi(dpi) {
    const [rows] = await db.query(`
      SELECT f.*, p.dpi as paciente_dpi, p.nombre as paciente_nombre, p.apellido as paciente_apellido,
             t.id as tratamiento_id
      FROM factura f
      LEFT JOIN paciente p ON f.dpi_paciente = p.dpi
      LEFT JOIN tratamiento t ON f.id_tratamiento = t.id
      WHERE f.dpi_paciente = ?
    `, [dpi]);
    return rows;
  }

  async create(factura) {
    const [result] = await db.query(
      'INSERT INTO factura (dpi_paciente, id_tratamiento, fecha_emision, monto_total) VALUES (?, ?, ?, ?)',
      [factura.dpiPaciente, factura.idTratamiento, factura.fechaEmision, factura.montoTotal]
    );
    return result.insertId;
  }

  async updateMontoTotal(id, montoTotal) {
    await db.query('UPDATE factura SET monto_total = ? WHERE id = ?', [montoTotal, id]);
  }
}

module.exports = new FacturaRepository();

