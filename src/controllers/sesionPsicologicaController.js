const sesionPsicologicaService = require('../services/sesionPsicologicaService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class SesionPsicologicaController {
  async getAllSesionesPsicologicas(req, res, next) {
    try {
      const sesiones = await sesionPsicologicaService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Sesiones psicológicas obtenidas con éxito');
      responseSuccessDto.setResponseObject(sesiones);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getSesionPsicologicaById(req, res, next) {
    try {
      const sesion = await sesionPsicologicaService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Sesión psicológica encontrada con éxito');
      responseSuccessDto.setResponseObject(sesion);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createSesionPsicologica(req, res, next) {
    try {
      await sesionPsicologicaService.createNewSesionPsicologica(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Sesión psicológica creada con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SesionPsicologicaController();

