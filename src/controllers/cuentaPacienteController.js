const cuentaPacienteService = require('../services/cuentaPacienteService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class CuentaPacienteController {
  async getAllCuentaPacientes(req, res, next) {
    try {
      const cuentaPacientes = await cuentaPacienteService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Cuentas de pacientes obtenidas con éxito');
      responseSuccessDto.setResponseObject(cuentaPacientes);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createCuentaPaciente(req, res, next) {
    try {
      await cuentaPacienteService.createCuentaPaciente(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Cuenta de paciente creada con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async recoveryPassword(req, res, next) {
    try {
      await cuentaPacienteService.recoveryPassword(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Recuperación de contraseña exitoso!');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CuentaPacienteController();

