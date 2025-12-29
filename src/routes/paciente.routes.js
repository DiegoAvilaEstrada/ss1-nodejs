const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/all', pacienteController.getAllPacientes.bind(pacienteController));
router.get('/:dpi', pacienteController.getPacienteById.bind(pacienteController));
router.post('/create', pacienteController.createPaciente.bind(pacienteController));
router.post('/update', pacienteController.updatePaciente.bind(pacienteController));
router.post('/delete/:dpi', pacienteController.deletePaciente.bind(pacienteController));

module.exports = router;

