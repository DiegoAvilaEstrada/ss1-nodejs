const db = require('../config/database');

class ProductoRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT p.*, tp.id as tipo_producto_id, tp.nombre_tipo
      FROM producto p
      LEFT JOIN tipo_producto tp ON p.id_tipo_producto = tp.id
    `);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT p.*, tp.id as tipo_producto_id, tp.nombre_tipo
      FROM producto p
      LEFT JOIN tipo_producto tp ON p.id_tipo_producto = tp.id
      WHERE p.id = ?
    `, [id]);
    return rows[0];
  }

  async create(producto) {
    const [result] = await db.query(
      'INSERT INTO producto (nombre_producto, descripcion, precio_venta, id_tipo_producto) VALUES (?, ?, ?, ?)',
      [producto.nombreProducto, producto.descripcion, producto.precioVenta, producto.idTipoProducto]
    );
    return result.insertId;
  }
}

module.exports = new ProductoRepository();

