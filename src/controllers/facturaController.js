const facturaService = require('../services/facturaService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class FacturaController {
  async getAllFacturas(req, res, next) {
    try {
      const facturas = await facturaService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Facturas obtenidas con éxito');
      responseSuccessDto.setResponseObject(facturas);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getFacturaById(req, res, next) {
    try {
      const factura = await facturaService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Factura encontrada con éxito');
      responseSuccessDto.setResponseObject(factura);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getFacturasByPacienteDpi(req, res, next) {
    try {
      const facturas = await facturaService.getByPacienteDpi(req.params.dpi);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Facturas obtenidas con éxito');
      responseSuccessDto.setResponseObject(facturas);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createFactura(req, res, next) {
    try {
      await facturaService.createNewFactura(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Factura creada con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FacturaController();

