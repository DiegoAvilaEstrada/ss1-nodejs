const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

router.get('/all', inventarioController.getAllInventarios.bind(inventarioController));
router.get('/:id', inventarioController.getInventarioById.bind(inventarioController));
router.post('/create', inventarioController.createInventario.bind(inventarioController));

module.exports = router;

