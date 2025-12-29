const cuentaEmpleadoService = require('../services/cuentaEmpleadoService');
const cuentaPacienteService = require('../services/cuentaPacienteService');
const codigoSesionEmpleadoService = require('../services/codigoSesionEmpleadoService');
const codigoSesionPacienteService = require('../services/codigoSesionPacienteService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class LoginController {
  async loginEmpleado(req, res, next) {
    try {
      const responseSuccessDto = await cuentaEmpleadoService.validateLogin(req.body);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async loginPaciente(req, res, next) {
    try {
      const responseSuccessDto = await cuentaPacienteService.validateLogin(req.body);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async verificationCodeEmpleado(req, res, next) {
    try {
      const responseSuccessDto = await codigoSesionEmpleadoService.verificationCode(req.body);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async verificationCodePaciente(req, res, next) {
    try {
      const responseSuccessDto = await codigoSesionPacienteService.verificationCode(req.body);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LoginController();

