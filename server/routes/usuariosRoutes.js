const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuariosController');

router.get('/responsaveis', userController.getUsers);
router.post('/responsaveis', userController.createUser);

module.exports = router;