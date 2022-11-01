const router = require('express').Router();

router.use('/auth', require('./UserRoutes'));

module.exports = router;