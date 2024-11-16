const express = require('express');
const router = express.Router();
const godsTableController = require('../controllers/godsTableController');

router.get('/childrenTask', godsTableController.getChildrenTask);


module.exports = router;