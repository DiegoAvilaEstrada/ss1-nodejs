const express = require('express');
const router = express.Router();
const tipoProductoController = require('../controllers/tipoProductoController');

router.get('/all', tipoProductoController.getAllTiposProducto.bind(tipoProductoController));
router.get('/:id', tipoProductoController.getTipoProductoById.bind(tipoProductoController));
router.post('/create', tipoProductoController.createTipoProducto.bind(tipoProductoController));

module.exports = router;

