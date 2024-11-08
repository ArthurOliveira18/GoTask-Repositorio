const express = require('express');
const router = express.Router();
const historyTaskController = require('../controllers/historyTaskController');

router.get('/users', historyTaskController.getUsers);
router.post('/users', historyTaskController.createUser);

module.exports = router;