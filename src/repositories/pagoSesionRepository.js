const db = require('../config/database');

class PagoSesionRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT ps.*, sp.id as sesion_id, f.id as factura_id
      FROM pago_sesion ps
      LEFT JOIN sesion_psicologica sp ON ps.id_sesion = sp.id
      LEFT JOIN factura f ON ps.id_factura = f.id
    `);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT ps.*, sp.id as sesion_id, f.id as factura_id
      FROM pago_sesion ps
      LEFT JOIN sesion_psicologica sp ON ps.id_sesion = sp.id
      LEFT JOIN factura f ON ps.id_factura = f.id
      WHERE ps.id = ?
    `, [id]);
    return rows[0];
  }

  async create(pagoSesion) {
    const [result] = await db.query(
      'INSERT INTO pago_sesion (id_sesion, id_factura, fecha_pago, descuento, monto_pagado) VALUES (?, ?, ?, ?, ?)',
      [
        pagoSesion.idSesion,
        pagoSesion.idFactura,
        pagoSesion.fechaPago,
        pagoSesion.descuento,
        pagoSesion.montoPagado
      ]
    );
    return result.insertId;
  }
}

module.exports = new PagoSesionRepository();

