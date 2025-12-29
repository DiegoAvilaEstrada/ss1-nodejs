const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/empleado', loginController.loginEmpleado.bind(loginController));
router.post('/paciente', loginController.loginPaciente.bind(loginController));
router.post('/code/empleado', loginController.verificationCodeEmpleado.bind(loginController));
router.post('/code/paciente', loginController.verificationCodePaciente.bind(loginController));

module.exports = router;

