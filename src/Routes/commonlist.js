const express = require('express');
const router = express.Router();
const CommonListController = require('../Controllers/CommonListController');

router.get('/', CommonListController.commonlist)

module.exports = router;