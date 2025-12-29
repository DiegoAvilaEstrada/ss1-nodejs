const db = require('../config/database');

class EmpleadoRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM empleado');
    return rows;
  }

  async findById(dpi) {
    const [rows] = await db.query('SELECT * FROM empleado WHERE dpi = ?', [dpi]);
    return rows[0];
  }

  async findByRol(rol) {
    const [rows] = await db.query(`
      SELECT e.* FROM empleado e
      INNER JOIN rol_empleado r ON e.id_rol_empleado = r.id
      WHERE r.nombre_rol = ?
    `, [rol]);
    return rows;
  }

  async create(empleado) {
    await db.query(
      `INSERT INTO empleado (dpi, nombre, apellido, telefono, email, salario, id_rol_empleado, descuento_igss) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        empleado.dpi,
        empleado.nombre,
        empleado.apellido,
        empleado.telefono,
        empleado.email,
        empleado.salario,
        empleado.idRolEmpleado,
        empleado.descuentoIgss
      ]
    );
  }

  async update(empleado) {
    await db.query(
      `UPDATE empleado SET nombre = ?, apellido = ?, telefono = ?, email = ?, salario = ?, 
       id_rol_empleado = ?, descuento_igss = ? WHERE dpi = ?`,
      [
        empleado.nombre,
        empleado.apellido,
        empleado.telefono,
        empleado.email,
        empleado.salario,
        empleado.idRolEmpleado,
        empleado.descuentoIgss,
        empleado.dpi
      ]
    );
  }

  async delete(dpi) {
    await db.query('DELETE FROM empleado WHERE dpi = ?', [dpi]);
  }
}

module.exports = new EmpleadoRepository();

