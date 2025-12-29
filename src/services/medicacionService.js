const medicacionRepository = require('../repositories/medicacionRepository');
const tratamientoService = require('./tratamientoService');
const productoService = require('./productoService');
const BusinessException = require('../dtos/exception/BusinessException');

class MedicacionService {
  async getAll() {
    return await medicacionRepository.findAll();
  }

  async getById(id) {
    const medicacion = await medicacionRepository.findById(id);
    if (!medicacion) {
      throw new BusinessException(404, 'Medicación no encontrada');
    }
    return medicacion;
  }

  async createNewMedicacion(newMedicacionDto) {
    await tratamientoService.getById(newMedicacionDto.idTratamiento);
    await productoService.getById(newMedicacionDto.idProducto);
    
    await medicacionRepository.create(newMedicacionDto);
  }

  async updateMedicacion(id, newMedicacionDto) {
    await this.getById(id);
    await tratamientoService.getById(newMedicacionDto.idTratamiento);
    await productoService.getById(newMedicacionDto.idProducto);
    
    await medicacionRepository.update({
      id: id,
      idTratamiento: newMedicacionDto.idTratamiento,
      idProducto: newMedicacionDto.idProducto,
      dosis: newMedicacionDto.dosis,
      frecuencia: newMedicacionDto.frecuencia
    });
  }

  async deleteMedicacion(id) {
    await this.getById(id);
    await medicacionRepository.delete(id);
  }
}

module.exports = new MedicacionService();

