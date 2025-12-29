const areaEmpleadoService = require('../services/areaEmpleadoService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class AreaEmpleadoController {
  async getAllAreaEmpleados(req, res, next) {
    try {
      const areaEmpleados = await areaEmpleadoService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('AreaEmpleados obtenidos con éxito');
      responseSuccessDto.setResponseObject(areaEmpleados);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getAreaEmpleadoById(req, res, next) {
    try {
      const areaEmpleado = await areaEmpleadoService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('AreaEmpleado encontrado con éxito');
      responseSuccessDto.setResponseObject(areaEmpleado);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createAreaEmpleado(req, res, next) {
    try {
      await areaEmpleadoService.createNewAreaEmpleado(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('AreaEmpleado creado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AreaEmpleadoController();

