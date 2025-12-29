const facturaRepository = require('../repositories/facturaRepository');
const pacienteService = require('./pacienteService');
const tratamientoService = require('./tratamientoService');
const BusinessException = require('../dtos/exception/BusinessException');

class FacturaService {
  async getAll() {
    return await facturaRepository.findAll();
  }

  async getById(id) {
    const factura = await facturaRepository.findById(id);
    if (!factura) {
      throw new BusinessException(404, 'Factura no encontrada');
    }
    return factura;
  }

  async getByPacienteDpi(dpi) {
    await pacienteService.getById(dpi);
    return await facturaRepository.findByPacienteDpi(dpi);
  }

  async createNewFactura(newFacturaDto) {
    await pacienteService.getById(newFacturaDto.dpiPaciente);
    await tratamientoService.getById(newFacturaDto.idTratamiento);
    
    const today = new Date().toISOString().split('T')[0];
    await facturaRepository.create({
      dpiPaciente: newFacturaDto.dpiPaciente,
      idTratamiento: newFacturaDto.idTratamiento,
      fechaEmision: today,
      montoTotal: 0.0
    });
  }
}

module.exports = new FacturaService();

