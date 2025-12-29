const db = require('../config/database');

class CuentaEmpleadoRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT ce.*, e.dpi, e.nombre, e.apellido, e.telefono, e.email, e.salario, e.descuento_igss, e.id_rol_empleado
      FROM cuenta_empleado ce
      LEFT JOIN empleado e ON ce.dpi_empleado = e.dpi
    `);
    return rows;
  }

  async findById(username) {
    const [rows] = await db.query(`
      SELECT ce.*, e.dpi, e.nombre, e.apellido, e.telefono, e.email, e.salario, e.descuento_igss, e.id_rol_empleado
      FROM cuenta_empleado ce
      LEFT JOIN empleado e ON ce.dpi_empleado = e.dpi
      WHERE ce.username = ?
    `, [username]);
    return rows[0];
  }

  async create(cuentaEmpleado) {
    await db.query(
      'INSERT INTO cuenta_empleado (username, password, dpi_empleado) VALUES (?, ?, ?)',
      [cuentaEmpleado.username, cuentaEmpleado.password, cuentaEmpleado.dpiEmpleado]
    );
  }

  async update(cuentaEmpleado) {
    await db.query(
      'UPDATE cuenta_empleado SET password = ? WHERE username = ?',
      [cuentaEmpleado.password, cuentaEmpleado.username]
    );
  }
}

module.exports = new CuentaEmpleadoRepository();

