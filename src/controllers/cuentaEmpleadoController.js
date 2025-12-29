const cuentaEmpleadoService = require('../services/cuentaEmpleadoService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class CuentaEmpleadoController {
  async getAllCuentaEmpleados(req, res, next) {
    try {
      const cuentaEmpleados = await cuentaEmpleadoService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Cuentas de empleados obtenidas con éxito');
      responseSuccessDto.setResponseObject(cuentaEmpleados);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createCuentaEmpleado(req, res, next) {
    try {
      await cuentaEmpleadoService.createCuentaEmpleado(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Cuenta de empleado creada con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async recoveryPassword(req, res, next) {
    try {
      await cuentaEmpleadoService.recoveryPassword(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Recuperación de contraseña exitoso!');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CuentaEmpleadoController();

