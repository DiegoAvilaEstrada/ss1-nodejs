const codigoSesionPacienteRepository = require('../repositories/codigoSesionPacienteRepository');
const pacienteService = require('./pacienteService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');
const BusinessException = require('../dtos/exception/BusinessException');

class CodigoSesionPacienteService {
  async verificationCode(verificationCodeDto) {
    const codigoSesion = await codigoSesionPacienteRepository.findByCodigo(verificationCodeDto.code);
    
    if (!codigoSesion) {
      throw new BusinessException(404, 'El código de verificación no existe');
    }

    const paciente = await pacienteService.getById(codigoSesion.dpi_paciente);
    
    const responseSuccessDto = new ResponseSuccessDto();
    responseSuccessDto.setCode(200);
    responseSuccessDto.setResponseObject(paciente);
    responseSuccessDto.setMessage('Verificación de código exitoso!');
    
    return responseSuccessDto;
  }
}

module.exports = new CodigoSesionPacienteService();

