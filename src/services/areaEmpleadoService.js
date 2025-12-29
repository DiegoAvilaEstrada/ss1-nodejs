const areaEmpleadoRepository = require('../repositories/areaEmpleadoRepository');
const areaService = require('./areaService');
const empleadoService = require('./empleadoService');
const BusinessException = require('../dtos/exception/BusinessException');

class AreaEmpleadoService {
  async getAll() {
    return await areaEmpleadoRepository.findAll();
  }

  async getById(id) {
    const areaEmpleado = await areaEmpleadoRepository.findById(id);
    if (!areaEmpleado) {
      throw new BusinessException(404, 'AreaEmpleado no encontrado');
    }
    return areaEmpleado;
  }

  async createNewAreaEmpleado(newAreaEmpleadoDto) {
    await areaService.getById(newAreaEmpleadoDto.idArea);
    await empleadoService.getById(newAreaEmpleadoDto.dpiEmpleado);
    
    await areaEmpleadoRepository.create(newAreaEmpleadoDto);
  }
}

module.exports = new AreaEmpleadoService();

