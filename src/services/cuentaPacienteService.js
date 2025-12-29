const cuentaPacienteRepository = require('../repositories/cuentaPacienteRepository');
const pacienteService = require('./pacienteService');
const authUtils = require('../utils/authUtils');
const emailService = require('./emailService');
const codigoSesionPacienteRepository = require('../repositories/codigoSesionPacienteRepository');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');
const BusinessException = require('../dtos/exception/BusinessException');

class CuentaPacienteService {
  async getAll() {
    return await cuentaPacienteRepository.findAll();
  }

  async createCuentaPaciente(newPacienteCuentaDto) {
    await pacienteService.getById(newPacienteCuentaDto.dpi);
    
    const hashedPassword = authUtils.hashPassword(newPacienteCuentaDto.password);
    await cuentaPacienteRepository.create({
      username: newPacienteCuentaDto.username,
      password: hashedPassword,
      dpiPaciente: newPacienteCuentaDto.dpi
    });
  }

  async validateLogin(logInDto) {
    const cuentaPaciente = await cuentaPacienteRepository.findById(logInDto.username);
    
    if (!cuentaPaciente) {
      throw new BusinessException(404, 'Paciente no encontrado');
    }
    
    const passwordValid = authUtils.validatePassword(logInDto.password, cuentaPaciente.password);
    
    if (!passwordValid) {
      throw new BusinessException(404, 'Contraseña incorrecta');
    }

    const verificationCode = await emailService.sendVerificationCode(cuentaPaciente.email);
    const fechaExpiracion = authUtils.createExpirationLocalDateTime(2);

    await codigoSesionPacienteRepository.create({
      codigo: verificationCode,
      fechaExpiracion: fechaExpiracion,
      username: cuentaPaciente.username
    });

    return new ResponseSuccessDto(200, 'Se ha enviado un codigo a su correo', null);
  }

  async recoveryPassword(pacienteRecoveryPasswordDto) {
    const cuentaPaciente = await cuentaPacienteRepository.findById(pacienteRecoveryPasswordDto.username);
    
    if (!cuentaPaciente) {
      throw new BusinessException(404, 'Usuario no encontrado');
    }
    
    if (pacienteRecoveryPasswordDto.newPassword !== pacienteRecoveryPasswordDto.confirmNewPassword) {
      throw new BusinessException(400, 'La nueva contraseña no coincide con la confirmación');
    }
    
    const hashedPassword = authUtils.hashPassword(pacienteRecoveryPasswordDto.newPassword);
    await cuentaPacienteRepository.update({
      username: pacienteRecoveryPasswordDto.username,
      password: hashedPassword
    });
  }
}

module.exports = new CuentaPacienteService();

