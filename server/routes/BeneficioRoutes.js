const express = require('express');
const router = express.Router();
const BeneficioController = require('../controllers/BeneficioController');


router.get('/beneficios', BeneficioController.getBeneficio);
router.post('/beneficios', BeneficioController.createBeneficio);


module.exports = router;