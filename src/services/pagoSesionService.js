const pagoSesionRepository = require('../repositories/pagoSesionRepository');
const sesionPsicologicaService = require('./sesionPsicologicaService');
const facturaService = require('./facturaService');
const BusinessException = require('../dtos/exception/BusinessException');

class PagoSesionService {
  async getAll() {
    return await pagoSesionRepository.findAll();
  }

  async getById(id) {
    const pagoSesion = await pagoSesionRepository.findById(id);
    if (!pagoSesion) {
      throw new BusinessException(404, 'Pago de sesión no encontrado');
    }
    return pagoSesion;
  }

  async createNewPagoSesion(newPagoSesionDto) {
    await sesionPsicologicaService.getById(newPagoSesionDto.idSesion);
    await facturaService.getById(newPagoSesionDto.idFactura);
    
    await pagoSesionRepository.create(newPagoSesionDto);
  }
}

module.exports = new PagoSesionService();

