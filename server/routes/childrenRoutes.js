const express = require('express');
const router = express.Router();
const childrenController = require('../controllers/childrenController');

router.get('/children', childrenController.getUsers);
router.post('/children', childrenController.createUser);

module.exports = router;