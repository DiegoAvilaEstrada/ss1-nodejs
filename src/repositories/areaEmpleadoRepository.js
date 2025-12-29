const db = require('../config/database');

class AreaEmpleadoRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT ae.*, a.id as area_id, a.nombre_area, e.dpi as empleado_dpi, e.nombre as empleado_nombre, e.apellido as empleado_apellido
      FROM area_empleado ae
      LEFT JOIN area a ON ae.id_area = a.id
      LEFT JOIN empleado e ON ae.dpi_empleado = e.dpi
    `);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT ae.*, a.id as area_id, a.nombre_area, e.dpi as empleado_dpi, e.nombre as empleado_nombre, e.apellido as empleado_apellido
      FROM area_empleado ae
      LEFT JOIN area a ON ae.id_area = a.id
      LEFT JOIN empleado e ON ae.dpi_empleado = e.dpi
      WHERE ae.id = ?
    `, [id]);
    return rows[0];
  }

  async create(areaEmpleado) {
    const [result] = await db.query(
      'INSERT INTO area_empleado (id_area, dpi_empleado) VALUES (?, ?)',
      [areaEmpleado.idArea, areaEmpleado.dpiEmpleado]
    );
    return result.insertId;
  }
}

module.exports = new AreaEmpleadoRepository();

