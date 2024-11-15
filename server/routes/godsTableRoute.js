const express = require('express');
const router = express.Router();
const godsTableController = require('../controllers/godsTableController');

router.get('/children', godsTableController.getChildren);
router.post('/children', godsTableController.createChildren);

module.exports = router;