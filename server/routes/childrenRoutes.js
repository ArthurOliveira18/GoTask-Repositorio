const express = require('express');
const router = express.Router();
const childrenController = require('../controllers/childrenController');

router.get('/children', childrenController.getChildren);
// Rota feita para mostrar os dados da criança clicada.
router.get('/children/:idCrianca', childrenController.getChildById);
router.post('/children', childrenController.createChildren);
router.put('/children/:idCrianca', childrenController.updateChild);

module.exports = router;