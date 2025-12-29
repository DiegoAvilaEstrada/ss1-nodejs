const pacienteService = require('../services/pacienteService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class PacienteController {
  async getAllPacientes(req, res, next) {
    try {
      const pacientes = await pacienteService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Pacientes obtenidos con éxito');
      responseSuccessDto.setResponseObject(pacientes);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getPacienteById(req, res, next) {
    try {
      const paciente = await pacienteService.getById(req.params.dpi);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Paciente encontrado con éxito');
      responseSuccessDto.setResponseObject(paciente);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createPaciente(req, res, next) {
    try {
      await pacienteService.createNewPaciente(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Paciente creado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async updatePaciente(req, res, next) {
    try {
      await pacienteService.updatePaciente(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Paciente actualizado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async deletePaciente(req, res, next) {
    try {
      await pacienteService.deletePaciente(req.params.dpi);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Paciente eliminado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PacienteController();

