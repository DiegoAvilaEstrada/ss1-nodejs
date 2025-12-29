const empleadoRepository = require('../repositories/empleadoRepository');
const rolService = require('./rolService');
const BusinessException = require('../dtos/exception/BusinessException');

class EmpleadoService {
  async getAll() {
    return await empleadoRepository.findAll();
  }

  async getById(dpi) {
    const empleado = await empleadoRepository.findById(dpi);
    if (!empleado) {
      throw new BusinessException(404, 'Empleado no encontrado');
    }
    return empleado;
  }

  async getByRol(rol) {
    return await empleadoRepository.findByRol(rol);
  }

  async createNewEmpleado(newEmpleadoDto) {
    // Verify rol exists
    await rolService.getById(newEmpleadoDto.idRolEmpleado);
    
    await empleadoRepository.create({
      dpi: newEmpleadoDto.dpi,
      nombre: newEmpleadoDto.nombre,
      apellido: newEmpleadoDto.apellido,
      telefono: newEmpleadoDto.telefono,
      email: newEmpleadoDto.email,
      salario: newEmpleadoDto.salario,
      idRolEmpleado: newEmpleadoDto.idRolEmpleado,
      descuentoIgss: newEmpleadoDto.descuentoIgss
    });
  }

  async updateEmpleado(newEmpleadoDto) {
    await this.getById(newEmpleadoDto.dpi);
    await rolService.getById(newEmpleadoDto.idRolEmpleado);
    
    await empleadoRepository.update({
      dpi: newEmpleadoDto.dpi,
      nombre: newEmpleadoDto.nombre,
      apellido: newEmpleadoDto.apellido,
      telefono: newEmpleadoDto.telefono,
      email: newEmpleadoDto.email,
      salario: newEmpleadoDto.salario,
      idRolEmpleado: newEmpleadoDto.idRolEmpleado,
      descuentoIgss: newEmpleadoDto.descuentoIgss
    });
  }

  async deleteEmpleado(dpi) {
    await this.getById(dpi);
    await empleadoRepository.delete(dpi);
  }
}

module.exports = new EmpleadoService();

