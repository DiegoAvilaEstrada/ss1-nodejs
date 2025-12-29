const express = require('express');
const router = express.Router();
const detalleFacturaController = require('../controllers/detalleFacturaController');

router.get('/all', detalleFacturaController.getAllDetallesFactura.bind(detalleFacturaController));
router.get('/:id', detalleFacturaController.getDetalleFacturaById.bind(detalleFacturaController));
router.post('/create', detalleFacturaController.createDetalleFactura.bind(detalleFacturaController));

module.exports = router;

