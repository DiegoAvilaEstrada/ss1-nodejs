const express = require('express');
const router = express.Router();
const sesionPsicologicaController = require('../controllers/sesionPsicologicaController');

router.get('/all', sesionPsicologicaController.getAllSesionesPsicologicas.bind(sesionPsicologicaController));
router.get('/:id', sesionPsicologicaController.getSesionPsicologicaById.bind(sesionPsicologicaController));
router.post('/create', sesionPsicologicaController.createSesionPsicologica.bind(sesionPsicologicaController));

module.exports = router;

