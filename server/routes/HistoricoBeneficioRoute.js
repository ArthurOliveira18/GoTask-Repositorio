const express = require('express');
const router = express.Router();
const HistoricoBeneficioController = require('../controllers/HistoricoBeneficioController');

// Rota para obter o histórico de benefícios
router.get('/historicoBeneficio', HistoricoBeneficioController.getHistoricoBeneficio);

// Rota para criar um novo resgate de benefício
router.post('/historicoBeneficio', HistoricoBeneficioController.createInsertBenef);

module.exports = router;
