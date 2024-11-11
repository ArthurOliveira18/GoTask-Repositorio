const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/TasksController');

router.get('/task', TasksController.getTasks);
router.post('/task', TasksController.createTasks);
router.put('/task', TasksController.editTasks);
router.delete('/task', TasksController.deleteTasks);

module.exports = router;