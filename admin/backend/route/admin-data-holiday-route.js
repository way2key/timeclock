const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminDataHolidayController = require('../controller/admin-data-holiday-controller');

//Routes
router.delete('/:holidayId', auth, adminDataHolidayController.deleteHoliday);
router.post('/', auth, adminDataHolidayController.createHoliday);
router.get('/', adminDataHolidayController.getHoliday);

module.exports = router;
