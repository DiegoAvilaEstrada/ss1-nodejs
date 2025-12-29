const tratamientoRepository = require('../repositories/tratamientoRepository');
const pacienteService = require('./pacienteService');
const empleadoService = require('./empleadoService');
const BusinessException = require('../dtos/exception/BusinessException');

class TratamientoService {
  async getAll() {
    return await tratamientoRepository.findAll();
  }

  async getById(id) {
    const tratamiento = await tratamientoRepository.findById(id);
    if (!tratamiento) {
      throw new BusinessException(404, 'Tratamiento no encontrado');
    }
    return tratamiento;
  }

  async createNewTratamiento(newTratamientoDto) {
    await pacienteService.getById(newTratamientoDto.dpiPaciente);
    await empleadoService.getById(newTratamientoDto.psicologoDpi);
    
    await tratamientoRepository.create({
      idPaciente: newTratamientoDto.dpiPaciente,
      psicologoDpi: newTratamientoDto.psicologoDpi,
      medicado: newTratamientoDto.medicado,
      fechaInicio: newTratamientoDto.fechaInicio,
      estadoTratamiento: newTratamientoDto.estadoTratamiento
    });
  }
}

module.exports = new TratamientoService();

