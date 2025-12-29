const codigoSesionEmpleadoRepository = require('../repositories/codigoSesionEmpleadoRepository');
const cuentaEmpleadoRepository = require('../repositories/cuentaEmpleadoRepository');
const empleadoService = require('./empleadoService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');
const BusinessException = require('../dtos/exception/BusinessException');

class CodigoSesionEmpleadoService {
  async verificationCode(verificationCodeDto) {
    const codigoSesion = await codigoSesionEmpleadoRepository.findByCodigo(verificationCodeDto.code);
    
    if (!codigoSesion) {
      throw new BusinessException(404, 'El código de verificación no existe');
    }

    const empleado = await empleadoService.getById(codigoSesion.dpi_empleado);
    
    const responseSuccessDto = new ResponseSuccessDto();
    responseSuccessDto.setCode(200);
    responseSuccessDto.setResponseObject(empleado);
    responseSuccessDto.setMessage('Verificación de código exitoso!');
    
    return responseSuccessDto;
  }
}

module.exports = new CodigoSesionEmpleadoService();

