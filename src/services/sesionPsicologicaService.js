const sesionPsicologicaRepository = require('../repositories/sesionPsicologicaRepository');
const tratamientoService = require('./tratamientoService');
const BusinessException = require('../dtos/exception/BusinessException');

class SesionPsicologicaService {
  async getAll() {
    return await sesionPsicologicaRepository.findAll();
  }

  async getById(id) {
    const sesion = await sesionPsicologicaRepository.findById(id);
    if (!sesion) {
      throw new BusinessException(404, 'Sesión psicológica no encontrada');
    }
    return sesion;
  }

  async createNewSesionPsicologica(newSesionPsicologicaDto) {
    await tratamientoService.getById(newSesionPsicologicaDto.idTratamiento);
    
    await sesionPsicologicaRepository.create({
      idTratamiento: newSesionPsicologicaDto.idTratamiento,
      fechaSesion: newSesionPsicologicaDto.fechaSesion,
      observaciones: newSesionPsicologicaDto.observaciones
    });
  }
}

module.exports = new SesionPsicologicaService();

