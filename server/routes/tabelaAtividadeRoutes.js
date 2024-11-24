const express = require('express');
const router = express.Router();
const  { getTasksByDay }  = require('../controllers/tabelaAtividadeController');

router.get('/tasksByDay/:idCrianca', getTasksByDay);

module.exports = router;
