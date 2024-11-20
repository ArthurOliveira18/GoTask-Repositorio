const express = require('express');
const router = express.Router();
const godsTableController = require('../controllers/getChildrenController');

// Rota para buscar crianças e tarefas
router.get('/childrenTask/:idResp', godsTableController.getChildrenTask);

// Rota para inserir nova tarefa no histórico
router.post('/childrenTask/:idResp/add', godsTableController.createInsert);

// Rota para atualizar pontos da criança
router.put('/childrenTask/updatePoints', godsTableController.updatePoints);

module.exports = router;
