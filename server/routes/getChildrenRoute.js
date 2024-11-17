const express = require('express');
const router = express.Router();
const godsTableController = require('../controllers/getChildrenController');

router.get('/childrenTask/:idResp', godsTableController.getChildrenTask);


module.exports = router;