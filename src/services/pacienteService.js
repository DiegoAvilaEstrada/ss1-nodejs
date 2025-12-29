const pacienteRepository = require('../repositories/pacienteRepository');
const BusinessException = require('../dtos/exception/BusinessException');

class PacienteService {
  async getAll() {
    return await pacienteRepository.findAll();
  }

  async getById(dpi) {
    const paciente = await pacienteRepository.findById(dpi);
    if (!paciente) {
      throw new BusinessException(404, 'Paciente no encontrado');
    }
    return paciente;
  }

  async createNewPaciente(newPacienteDto) {
    await pacienteRepository.create(newPacienteDto);
  }

  async updatePaciente(newPacienteDto) {
    await this.getById(newPacienteDto.dpi);
    await pacienteRepository.update(newPacienteDto);
  }

  async deletePaciente(dpi) {
    await this.getById(dpi);
    await pacienteRepository.delete(dpi);
  }
}

module.exports = new PacienteService();

