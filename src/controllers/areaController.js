const areaService = require('../services/areaService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class AreaController {
  async getAllAreas(req, res, next) {
    try {
      const areas = await areaService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Areas obtenidas con éxito');
      responseSuccessDto.setResponseObject(areas);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getAreaById(req, res, next) {
    try {
      const area = await areaService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Area encontrada con éxito');
      responseSuccessDto.setResponseObject(area);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createArea(req, res, next) {
    try {
      await areaService.createNewArea(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Area creada con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AreaController();

