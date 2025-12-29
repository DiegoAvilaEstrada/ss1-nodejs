const express = require('express');
const router = express.Router();
const areaEmpleadoController = require('../controllers/areaEmpleadoController');

router.get('/all', areaEmpleadoController.getAllAreaEmpleados.bind(areaEmpleadoController));
router.get('/:id', areaEmpleadoController.getAreaEmpleadoById.bind(areaEmpleadoController));
router.post('/create', areaEmpleadoController.createAreaEmpleado.bind(areaEmpleadoController));

module.exports = router;

