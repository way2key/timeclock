const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherSettingController = require('../controller/teacher-setting-controller');

//Routes
router.post('/password', auth, teacherSettingController.changePassword);
router.post('/notification', auth, teacherSettingController.updateClockMachineNotification);
router.post('/volume', auth, teacherSettingController.updateClockMachineVolume);
router.post('/week', auth, teacherSettingController.updateClockMachineDefaultWeek);
router.post('/sound', auth, teacherSettingController.updateClockMachineSound);
router.get('/:clockMachineId', teacherSettingController.getClockMachine);
router.delete('/log', auth, teacherSettingController.deleteLog);
router.delete('/incident', auth, teacherSettingController.deleteIncident);

module.exports = router;
