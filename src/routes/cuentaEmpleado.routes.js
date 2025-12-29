const express = require('express');
const router = express.Router();
const cuentaEmpleadoController = require('../controllers/cuentaEmpleadoController');

router.get('/all', cuentaEmpleadoController.getAllCuentaEmpleados.bind(cuentaEmpleadoController));
router.post('/create', cuentaEmpleadoController.createCuentaEmpleado.bind(cuentaEmpleadoController));
router.post('/recovery/password', cuentaEmpleadoController.recoveryPassword.bind(cuentaEmpleadoController));

module.exports = router;

