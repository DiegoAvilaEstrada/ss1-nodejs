const inventarioRepository = require('../repositories/inventarioRepository');
const productoRepository = require('../repositories/productoRepository');
const BusinessException = require('../dtos/exception/BusinessException');

class InventarioService {
  async getAll() {
    return await inventarioRepository.findAll();
  }

  async getById(id) {
    const inventario = await inventarioRepository.findById(id);
    if (!inventario) {
      throw new BusinessException(404, 'Inventario no encontrado');
    }
    return inventario;
  }

  async createNewInventario(newInventarioDto) {
    const producto = await productoRepository.findById(newInventarioDto.idProducto);
    if (!producto) {
      throw new BusinessException(404, 'Producto no encontrado');
    }

    const existingInventario = await inventarioRepository.findByProductId(newInventarioDto.idProducto);
    
    if (!existingInventario) {
      await inventarioRepository.create({
        idProducto: newInventarioDto.idProducto,
        stock: newInventarioDto.stock,
        minimoStock: newInventarioDto.minimoStock,
        ventasRealizadas: 0
      });
    } else {
      existingInventario.stock = existingInventario.stock + newInventarioDto.stock;
      await inventarioRepository.update(existingInventario);
    }
  }

  async modificarStockVentasInventario(idProducto, stock, ventasRealizadas) {
    const inventario = await inventarioRepository.findByProductId(idProducto);
    if (!inventario) {
      throw new BusinessException(404, 'Inventario no encontrado para el producto especificado');
    }

    inventario.stock = inventario.stock + stock;
    inventario.ventasRealizadas = inventario.ventasRealizadas + ventasRealizadas;
    await inventarioRepository.updateByProductId(idProducto, inventario);
  }
}

module.exports = new InventarioService();

