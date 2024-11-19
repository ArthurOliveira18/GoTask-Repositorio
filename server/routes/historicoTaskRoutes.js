const express = require('express');
const router = express.Router();
const historicoTaskController = require('../controllers/historicoTaskController');

// Rota para listar tasks do histórico
router.get('/historicoTask', historicoTaskController.getHistoricoTasks);

// Rota para criar uma nova entrada no histórico de tasks
router.post('/historicoTask', historicoTaskController.createHistoricoTasks);

// Rota para atualizar o status de uma tarefa no histórico
router.put('/historicoTask/:idHistoricoTask', historicoTaskController.updateTaskStatus);

module.exports = router;
