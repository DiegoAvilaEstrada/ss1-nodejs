const rolRepository = require('../repositories/rolRepository');
const BusinessException = require('../dtos/exception/BusinessException');

class RolService {
  async getAllRoles() {
    return await rolRepository.findAll();
  }

  async getById(id) {
    const rol = await rolRepository.findById(id);
    if (!rol) {
      throw new BusinessException(404, 'Rol no encontrado');
    }
    return rol;
  }

  async createNewRole(newRolDto) {
    await rolRepository.create({ rol: newRolDto.roleName });
  }
}

module.exports = new RolService();

