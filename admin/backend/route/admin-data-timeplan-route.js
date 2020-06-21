const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminDataTimeplanController = require('../controller/admin-data-timeplan-controller');

//Routes
router.get('/timeplan', adminDataTimeplanController.getTimeplan);
router.get('/timeplan/:timeplanId', adminDataTimeplanController.getATimeplan);
router.post('/', auth, adminDataTimeplanController.createTimeplan);
router.delete('/timeplan/:timeplanId', auth, adminDataTimeplanController.deleteTimeplan);

module.exports = router;
