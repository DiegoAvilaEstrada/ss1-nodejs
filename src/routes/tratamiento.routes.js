const express = require('express');
const router = express.Router();
const tratamientoController = require('../controllers/tratamientoController');

router.get('/all', tratamientoController.getAllTratamientos.bind(tratamientoController));
router.get('/:id', tratamientoController.getTratamientoById.bind(tratamientoController));
router.post('/create', tratamientoController.createTratamiento.bind(tratamientoController));

module.exports = router;

