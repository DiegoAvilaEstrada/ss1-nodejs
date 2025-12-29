const empleadoService = require('../services/empleadoService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class EmpleadoController {
  async getAllEmpleados(req, res, next) {
    try {
      const empleados = await empleadoService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Empleados obtenidos con éxito');
      responseSuccessDto.setResponseObject(empleados);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getEmpleadosByRol(req, res, next) {
    try {
      const empleados = await empleadoService.getByRol(req.params.rol);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Empleados obtenidos con éxito');
      responseSuccessDto.setResponseObject(empleados);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getEmpleadoById(req, res, next) {
    try {
      const empleado = await empleadoService.getById(req.params.dpi);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Empleado encontrado con éxito');
      responseSuccessDto.setResponseObject(empleado);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createEmpleado(req, res, next) {
    try {
      await empleadoService.createNewEmpleado(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Empleado creado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async updateEmpleado(req, res, next) {
    try {
      await empleadoService.updateEmpleado(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Empleado actualizado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async deleteEmpleado(req, res, next) {
    try {
      await empleadoService.deleteEmpleado(req.params.dpi);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Empleado eliminado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EmpleadoController();

