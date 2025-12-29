const db = require('../config/database');

class MedicacionRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT m.*, t.id as tratamiento_id, p.id as producto_id, p.nombre_producto
      FROM medicacion m
      LEFT JOIN tratamiento t ON m.id_tratamiento = t.id
      LEFT JOIN producto p ON m.id_producto = p.id
    `);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT m.*, t.id as tratamiento_id, p.id as producto_id, p.nombre_producto
      FROM medicacion m
      LEFT JOIN tratamiento t ON m.id_tratamiento = t.id
      LEFT JOIN producto p ON m.id_producto = p.id
      WHERE m.id = ?
    `, [id]);
    return rows[0];
  }

  async create(medicacion) {
    const [result] = await db.query(
      'INSERT INTO medicacion (id_tratamiento, id_producto, dosis, frecuencia) VALUES (?, ?, ?, ?)',
      [medicacion.idTratamiento, medicacion.idProducto, medicacion.dosis, medicacion.frecuencia]
    );
    return result.insertId;
  }

  async update(medicacion) {
    await db.query(
      'UPDATE medicacion SET id_tratamiento = ?, id_producto = ?, dosis = ?, frecuencia = ? WHERE id = ?',
      [medicacion.idTratamiento, medicacion.idProducto, medicacion.dosis, medicacion.frecuencia, medicacion.id]
    );
  }

  async delete(id) {
    await db.query('DELETE FROM medicacion WHERE id = ?', [id]);
  }
}

module.exports = new MedicacionRepository();

