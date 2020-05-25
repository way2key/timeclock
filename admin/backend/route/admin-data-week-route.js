const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminDataWeekController = require('../controller/admin-data-week-controller');

//Routes
router.post('/', auth, adminDataWeekController.createWeek);
router.get('/', auth, adminDataWeekController.getAllWeeks);
router.get('/:weekId', adminDataWeekController.getAWeek);
router.delete('/:weekId', auth, adminDataWeekController.deleteWeek);

module.exports = router;
