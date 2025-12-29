const areaRepository = require('../repositories/areaRepository');
const BusinessException = require('../dtos/exception/BusinessException');

class AreaService {
  async getAll() {
    return await areaRepository.findAll();
  }

  async getById(id) {
    const area = await areaRepository.findById(id);
    if (!area) {
      throw new BusinessException(404, 'Area no encontrada');
    }
    return area;
  }

  async createNewArea(newAreaDto) {
    await areaRepository.create(newAreaDto);
  }
}

module.exports = new AreaService();

