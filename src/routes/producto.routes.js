const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/all', productoController.getAllProductos.bind(productoController));
router.get('/:id', productoController.getProductoById.bind(productoController));
router.post('/create', productoController.createProducto.bind(productoController));

module.exports = router;

