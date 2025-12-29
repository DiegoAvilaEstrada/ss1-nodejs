const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

router.get('/all', facturaController.getAllFacturas.bind(facturaController));
router.get('/id/:id', facturaController.getFacturaById.bind(facturaController));
router.get('/:dpi', facturaController.getFacturasByPacienteDpi.bind(facturaController));
router.post('/create', facturaController.createFactura.bind(facturaController));

module.exports = router;

