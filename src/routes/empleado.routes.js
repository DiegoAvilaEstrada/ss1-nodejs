const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

router.get('/all', empleadoController.getAllEmpleados.bind(empleadoController));
router.get('/all/:rol', empleadoController.getEmpleadosByRol.bind(empleadoController));
router.get('/:dpi', empleadoController.getEmpleadoById.bind(empleadoController));
router.post('/create', empleadoController.createEmpleado.bind(empleadoController));
router.post('/update', empleadoController.updateEmpleado.bind(empleadoController));
router.post('/delete/:dpi', empleadoController.deleteEmpleado.bind(empleadoController));

module.exports = router;

