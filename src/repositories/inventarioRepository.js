const db = require('../config/database');

class InventarioRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT i.*, p.id as producto_id, p.nombre_producto, p.descripcion, p.precio_venta
      FROM inventario i
      LEFT JOIN producto p ON i.id_producto = p.id
    `);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT i.*, p.id as producto_id, p.nombre_producto, p.descripcion, p.precio_venta
      FROM inventario i
      LEFT JOIN producto p ON i.id_producto = p.id
      WHERE i.id = ?
    `, [id]);
    return rows[0];
  }

  async findByProductId(idProducto) {
    const [rows] = await db.query('SELECT * FROM inventario WHERE id_producto = ?', [idProducto]);
    return rows[0];
  }

  async create(inventario) {
    const [result] = await db.query(
      'INSERT INTO inventario (id_producto, stock, minimo_stock, ventas_realizadas) VALUES (?, ?, ?, ?)',
      [inventario.idProducto, inventario.stock, inventario.minimoStock, inventario.ventasRealizadas || 0]
    );
    return result.insertId;
  }

  async update(inventario) {
    await db.query(
      'UPDATE inventario SET stock = ?, minimo_stock = ?, ventas_realizadas = ? WHERE id = ?',
      [inventario.stock, inventario.minimoStock, inventario.ventasRealizadas, inventario.id]
    );
  }

  async updateByProductId(idProducto, inventario) {
    await db.query(
      'UPDATE inventario SET stock = ?, ventas_realizadas = ? WHERE id_producto = ?',
      [inventario.stock, inventario.ventasRealizadas, idProducto]
    );
  }
}

module.exports = new InventarioRepository();

