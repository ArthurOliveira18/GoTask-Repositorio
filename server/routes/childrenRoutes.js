const express = require('express');
const router = express.Router();
const childrenController = require('../controllers/childrenController');

router.get('/children', childrenController.getChildren);
router.post('/children', childrenController.createChildren);

module.exports = router;