const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const serverDayController = require('../controller/server-day-controller');
const serverClockMachineController = require('../controller/server-clock-machine-controller');
//Routes
router.get('/incident', serverDayController.unallowedPresenceIncident)
router.get('/day/:hash', serverDayController.isTodayDayExistingForStudent)
router.get('/sound', auth, serverClockMachineController.getSound);
router.post('/day', serverDayController.createDay);
router.post('/clock-machine', serverClockMachineController.createClockmachine);

module.exports = router;
