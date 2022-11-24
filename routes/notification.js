const router = require('express').Router();
const express = require("express");

// const notification = require('../controllers/NotificationController')
// const { isAuthenticated } = require('../controllers/auth.controller');
const { UserSettingsNotification, ViewDataNotification } = require('../controllers/notification');

router.post('/add-notification', UserSettingsNotification)
router.get('/view-notification/:id',ViewDataNotification)

module.exports = router;