const express = require('express');
const router = express.Router();
const medicacionController = require('../controllers/medicacionController');

router.get('/all', medicacionController.getAllMedicaciones.bind(medicacionController));
router.get('/:id', medicacionController.getMedicacionById.bind(medicacionController));
router.post('/create', medicacionController.createMedicacion.bind(medicacionController));
router.post('/update/:id', medicacionController.updateMedicacion.bind(medicacionController));
router.post('/delete/:id', medicacionController.deleteMedicacion.bind(medicacionController));

module.exports = router;

