const express = require('express');
const router = express.Router();
const historicoTaskController = require('../controllers/historicoTaskController');


router.get('/historicoTask', historicoTaskController.getHistoricoTasks);
router.post('/historicoTask', historicoTaskController.createHistoricoTasks);


module.exports = router;