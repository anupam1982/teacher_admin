const express = require('express');


const router = express.Router();
const NotificationController = require('../Controllers/NotificationController')


router.post('/', NotificationController.notificationlist)

module.exports = router;