const express = require('express');
const router = express.Router();
const cuentaPacienteController = require('../controllers/cuentaPacienteController');

router.get('/all', cuentaPacienteController.getAllCuentaPacientes.bind(cuentaPacienteController));
router.post('/create', cuentaPacienteController.createCuentaPaciente.bind(cuentaPacienteController));
router.post('/recovery/password', cuentaPacienteController.recoveryPassword.bind(cuentaPacienteController));

module.exports = router;

