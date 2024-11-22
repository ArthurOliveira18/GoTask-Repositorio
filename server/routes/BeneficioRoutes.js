const express = require('express');
const router = express.Router();
const BeneficioController = require('../controllers/BeneficioController');


router.get('/beneficios', BeneficioController.getBeneficio);
router.post('/beneficios', BeneficioController.createBeneficio);
router.get('/beneficios/:id', BeneficioController.getBeneficioById);
router.put('/beneficios/:id', BeneficioController.updateBeneficio);

// Rota para excluir um benefício
router.delete('/beneficios/:id', BeneficioController.deleteBeneficio);


module.exports = router;