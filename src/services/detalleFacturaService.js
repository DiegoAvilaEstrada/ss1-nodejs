const detalleFacturaRepository = require('../repositories/detalleFacturaRepository');
const facturaService = require('./facturaService');
const productoService = require('./productoService');
const inventarioService = require('./inventarioService');
const facturaRepository = require('../repositories/facturaRepository');
const BusinessException = require('../dtos/exception/BusinessException');

class DetalleFacturaService {
  async getAll() {
    return await detalleFacturaRepository.findAll();
  }

  async getById(id) {
    const detalle = await detalleFacturaRepository.findById(id);
    if (!detalle) {
      throw new BusinessException(404, 'Detalle de factura no encontrado');
    }
    return detalle;
  }

  async createNewDetalleFactura(newDetalleFacturaDto) {
    const producto = await productoService.getById(newDetalleFacturaDto.idProducto);
    const factura = await facturaService.getById(newDetalleFacturaDto.idFactura);
    
    const cantidad = newDetalleFacturaDto.cantidad;
    const costoTotal = parseFloat(producto.precio_venta) * cantidad;
    
    await detalleFacturaRepository.create({
      idFactura: newDetalleFacturaDto.idFactura,
      idProducto: newDetalleFacturaDto.idProducto,
      cantidad: cantidad,
      costoTotal: costoTotal
    });

    // Update factura total
    const nuevoMontoTotal = parseFloat(factura.monto_total || 0) + costoTotal;
    await facturaRepository.updateMontoTotal(newDetalleFacturaDto.idFactura, nuevoMontoTotal);

    // Update inventory
    await inventarioService.modificarStockVentasInventario(
      newDetalleFacturaDto.idProducto,
      -cantidad,
      cantidad
    );
  }
}

module.exports = new DetalleFacturaService();

