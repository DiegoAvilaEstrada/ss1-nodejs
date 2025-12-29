const tipoProductoService = require('../services/tipoProductoService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class TipoProductoController {
  async getAllTiposProducto(req, res, next) {
    try {
      const tiposProducto = await tipoProductoService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Tipos de producto obtenidos con éxito');
      responseSuccessDto.setResponseObject(tiposProducto);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getTipoProductoById(req, res, next) {
    try {
      const tipoProducto = await tipoProductoService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Tipo de producto encontrado con éxito');
      responseSuccessDto.setResponseObject(tipoProducto);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createTipoProducto(req, res, next) {
    try {
      await tipoProductoService.createNewTipoProducto(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Tipo de producto creado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TipoProductoController();

