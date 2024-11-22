const express = require('express');
const router = express.Router();
const childrenController = require('../controllers/childrenController');
// Rota para buscar todas as crianças
router.get('/children', childrenController.getChildren);

// Rota feita para mostrar os dados da criança clicada.
router.get('/children/:idCrianca', childrenController.getChildById);

// Rota para criar uma criança
router.post('/children', childrenController.createChildren);

// Rota para atualizar uma criança
router.put('/children/:idCrianca', childrenController.updateChild);

module.exports = router;