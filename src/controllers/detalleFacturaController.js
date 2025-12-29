const detalleFacturaService = require('../services/detalleFacturaService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class DetalleFacturaController {
  async getAllDetallesFactura(req, res, next) {
    try {
      const detalles = await detalleFacturaService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Detalles de factura obtenidos con éxito');
      responseSuccessDto.setResponseObject(detalles);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getDetalleFacturaById(req, res, next) {
    try {
      const detalle = await detalleFacturaService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Detalle de factura encontrado con éxito');
      responseSuccessDto.setResponseObject(detalle);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createDetalleFactura(req, res, next) {
    try {
      await detalleFacturaService.createNewDetalleFactura(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Detalle de factura creado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DetalleFacturaController();

