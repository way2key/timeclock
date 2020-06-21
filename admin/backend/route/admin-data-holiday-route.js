const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminDataHolidayController = require('../controller/admin-data-holiday-controller');

//Routes
router.get('/', adminDataHolidayController.getHoliday);
router.post('/', auth, adminDataHolidayController.createHoliday);
router.delete('/:holidayId', auth, adminDataHolidayController.deleteHoliday);


module.exports = router;
