const express = require('express');
const router = express.Router();
const godsTableController = require('../controllers/getChildrenController');

// Rota para buscar crianças e tarefas
router.get('/childrenTask/:idResp', godsTableController.getChildrenTask);

// Rota para inserir nova tarefa
// Alterei a URL para incluir o segmento 'add' no final do caminho
router.post('/childrenTask/:idResp/add', godsTableController.createInsert);

module.exports = router;
