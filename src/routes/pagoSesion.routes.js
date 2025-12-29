const express = require('express');
const router = express.Router();
const pagoSesionController = require('../controllers/pagoSesionController');

router.get('/all', pagoSesionController.getAllPagosSesion.bind(pagoSesionController));
router.get('/:id', pagoSesionController.getPagoSesionById.bind(pagoSesionController));
router.post('/create', pagoSesionController.createPagoSesion.bind(pagoSesionController));

module.exports = router;

