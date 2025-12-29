const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

router.get('/all', areaController.getAllAreas.bind(areaController));
router.get('/:id', areaController.getAreaById.bind(areaController));
router.post('/create', areaController.createArea.bind(areaController));

module.exports = router;

