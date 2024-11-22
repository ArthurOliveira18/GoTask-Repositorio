const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/TasksController');

router.get('/task', TasksController.getTasks);
// Rota para pegar a tarefa pelo ID
router.get('/task/:idTask', TasksController.getTaskById);

router.post('/task', TasksController.createTasks);
router.put('/task/:idTask', TasksController.editTasks);

router.delete('/task/:idTask', TasksController.deleteTask); // Excluir tarefa pelo ID
module.exports = router;