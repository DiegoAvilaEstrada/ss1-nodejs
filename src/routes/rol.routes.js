const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

router.get('/all', rolController.getAllRoles.bind(rolController));
router.get('/:id', rolController.getRolById.bind(rolController));
router.post('/create', rolController.createRol.bind(rolController));

module.exports = router;

