const pagoSesionService = require('../services/pagoSesionService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class PagoSesionController {
  async getAllPagosSesion(req, res, next) {
    try {
      const pagos = await pagoSesionService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Pagos de sesión obtenidos con éxito');
      responseSuccessDto.setResponseObject(pagos);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getPagoSesionById(req, res, next) {
    try {
      const pago = await pagoSesionService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Pago de sesión encontrado con éxito');
      responseSuccessDto.setResponseObject(pago);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createPagoSesion(req, res, next) {
    try {
      await pagoSesionService.createNewPagoSesion(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Pago de sesión creado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PagoSesionController();

