const inventarioService = require('../services/inventarioService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class InventarioController {
  async getAllInventarios(req, res, next) {
    try {
      const inventarios = await inventarioService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Inventarios obtenidos con éxito');
      responseSuccessDto.setResponseObject(inventarios);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getInventarioById(req, res, next) {
    try {
      const inventario = await inventarioService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Inventario encontrado con éxito');
      responseSuccessDto.setResponseObject(inventario);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createInventario(req, res, next) {
    try {
      await inventarioService.createNewInventario(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Inventario creado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InventarioController();

