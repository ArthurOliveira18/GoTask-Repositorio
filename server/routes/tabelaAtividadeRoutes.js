const express = require('express');
const router = express.Router();
const { getTasksByDay, getHistoricoTasks } = require('../controllers/tabelaAtividadeController');

// Rota para buscar tarefas por dia para uma criança específica
router.get('/tabela/:criancaId', getTasksByDay);

router.get('/tabela', getHistoricoTasks);

module.exports = router;
