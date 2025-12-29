const productoRepository = require('../repositories/productoRepository');
const tipoProductoService = require('./tipoProductoService');
const BusinessException = require('../dtos/exception/BusinessException');

class ProductoService {
  async getAll() {
    return await productoRepository.findAll();
  }

  async getById(id) {
    const producto = await productoRepository.findById(id);
    if (!producto) {
      throw new BusinessException(404, 'Producto no encontrado');
    }
    return producto;
  }

  async createNewProducto(newProductoDto) {
    await tipoProductoService.getById(newProductoDto.idTipoProducto);
    await productoRepository.create(newProductoDto);
  }
}

module.exports = new ProductoService();

