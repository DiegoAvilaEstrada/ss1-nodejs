const db = require('../config/database');

class DetalleFacturaRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT df.*, f.id as factura_id, p.id as producto_id, p.nombre_producto, p.precio_venta
      FROM detalle_factura df
      LEFT JOIN factura f ON df.id_factura = f.id
      LEFT JOIN producto p ON df.id_producto = p.id
    `);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT df.*, f.id as factura_id, p.id as producto_id, p.nombre_producto, p.precio_venta
      FROM detalle_factura df
      LEFT JOIN factura f ON df.id_factura = f.id
      LEFT JOIN producto p ON df.id_producto = p.id
      WHERE df.id = ?
    `, [id]);
    return rows[0];
  }

  async create(detalleFactura) {
    const [result] = await db.query(
      'INSERT INTO detalle_factura (id_factura, id_producto, cantidad, costo_total) VALUES (?, ?, ?, ?)',
      [
        detalleFactura.idFactura,
        detalleFactura.idProducto,
        detalleFactura.cantidad,
        detalleFactura.costoTotal
      ]
    );
    return result.insertId;
  }
}

module.exports = new DetalleFacturaRepository();

