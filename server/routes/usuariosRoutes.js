const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuariosController');

router.get('/responsaveis', userController.getUsers);
router.post('/responsaveis', userController.createUser);
router.delete('/responsaveis/:idResponsavel', userController.deleteUser);

module.exports = router;