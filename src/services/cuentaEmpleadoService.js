const cuentaEmpleadoRepository = require('../repositories/cuentaEmpleadoRepository');
const empleadoService = require('./empleadoService');
const authUtils = require('../utils/authUtils');
const emailService = require('./emailService');
const codigoSesionEmpleadoRepository = require('../repositories/codigoSesionEmpleadoRepository');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');
const BusinessException = require('../dtos/exception/BusinessException');

class CuentaEmpleadoService {
  async getAll() {
    return await cuentaEmpleadoRepository.findAll();
  }

  async createCuentaEmpleado(newCuentaEmpleadoDto) {
    await empleadoService.getById(newCuentaEmpleadoDto.dpi);
    
    const hashedPassword = authUtils.hashPassword(newCuentaEmpleadoDto.password);
    await cuentaEmpleadoRepository.create({
      username: newCuentaEmpleadoDto.username,
      password: hashedPassword,
      dpiEmpleado: newCuentaEmpleadoDto.dpi
    });
  }

  async validateLogin(logInDto) {
    const cuentaEmpleado = await cuentaEmpleadoRepository.findById(logInDto.username);
    
    if (!cuentaEmpleado) {
      throw new BusinessException(404, 'Empleado no encontrado');
    }
    
    const passwordValid = authUtils.validatePassword(logInDto.password, cuentaEmpleado.password);
    
    if (!passwordValid) {
      throw new BusinessException(404, 'Contraseña incorrecta');
    }

    const verificationCode = await emailService.sendVerificationCode(cuentaEmpleado.email);
    const fechaExpiracion = authUtils.createExpirationLocalDateTime(2);

    await codigoSesionEmpleadoRepository.create({
      codigo: verificationCode,
      fechaExpiracion: fechaExpiracion,
      username: cuentaEmpleado.username
    });

    return new ResponseSuccessDto(200, 'Se ha enviado un codigo a su correo', null);
  }

  async recoveryPassword(empleadoRecoveryPasswordDto) {
    const cuentaEmpleado = await cuentaEmpleadoRepository.findById(empleadoRecoveryPasswordDto.username);
    
    if (!cuentaEmpleado) {
      throw new BusinessException(404, 'Usuario no encontrado');
    }
    
    if (empleadoRecoveryPasswordDto.newPassword !== empleadoRecoveryPasswordDto.confirmNewPassword) {
      throw new BusinessException(400, 'La nueva contraseña no coincide con la confirmación');
    }
    
    const hashedPassword = authUtils.hashPassword(empleadoRecoveryPasswordDto.newPassword);
    await cuentaEmpleadoRepository.update({
      username: empleadoRecoveryPasswordDto.username,
      password: hashedPassword
    });
  }
}

module.exports = new CuentaEmpleadoService();

