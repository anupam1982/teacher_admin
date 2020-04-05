const express = require('express');
const router = express.Router();
const SuspendController = require('../Controllers/SuspendController');


router.post('/', SuspendController.suspend)
module.exports = router;