const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminDashboardController = require('../controller/admin-dashboard-controller');

//Routes
router.get('/admin', auth, adminDashboardController.getAnAdmin);

module.exports = router;
