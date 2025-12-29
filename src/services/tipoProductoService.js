const tipoProductoRepository = require('../repositories/tipoProductoRepository');
const BusinessException = require('../dtos/exception/BusinessException');

class TipoProductoService {
  async getAll() {
    return await tipoProductoRepository.findAll();
  }

  async getById(id) {
    const tipoProducto = await tipoProductoRepository.findById(id);
    if (!tipoProducto) {
      throw new BusinessException(404, 'Tipo de producto no encontrado');
    }
    return tipoProducto;
  }

  async createNewTipoProducto(newTipoProductoDto) {
    await tipoProductoRepository.create(newTipoProductoDto);
  }
}

module.exports = new TipoProductoService();

