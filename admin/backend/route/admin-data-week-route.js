const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminDataWeekController = require('../controller/admin-data-week-controller');

//Routes
router.get('/', auth, adminDataWeekController.getAllWeeks);
router.get('/:weekId', adminDataWeekController.getAWeek);
router.post('/', auth, adminDataWeekController.createWeek);
router.delete('/:weekId', auth, adminDataWeekController.deleteWeek);

module.exports = router;
