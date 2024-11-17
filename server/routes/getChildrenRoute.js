const express = require('express');
const router = express.Router();
const godsTableController = require('../controllers/getChildrenController');

router.get('/childrenTask', godsTableController.getChildrenTask);


module.exports = router;