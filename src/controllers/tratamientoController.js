const tratamientoService = require('../services/tratamientoService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class TratamientoController {
  async getAllTratamientos(req, res, next) {
    try {
      const tratamientos = await tratamientoService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Tratamientos obtenidos con éxito');
      responseSuccessDto.setResponseObject(tratamientos);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getTratamientoById(req, res, next) {
    try {
      const tratamiento = await tratamientoService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Tratamiento encontrado con éxito');
      responseSuccessDto.setResponseObject(tratamiento);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createTratamiento(req, res, next) {
    try {
      await tratamientoService.createNewTratamiento(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Tratamiento creado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TratamientoController();

