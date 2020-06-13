const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherSettingController = require('../controller/teacher-setting-controller');

//Routes
router.put('/week', auth, teacherSettingController.updateClockMachineDefaultWeek);
router.put('/sound', auth, teacherSettingController.updateClockMachineSound);
router.put('/volume', auth, teacherSettingController.updateClockMachineVolume);
router.put('/password', auth, teacherSettingController.updatePassword);
router.put('/notification', auth, teacherSettingController.updateClockMachineNotification);
router.get('/:clockMachineId', teacherSettingController.getClockMachine);
router.delete('/log', auth, teacherSettingController.deleteLog);
router.delete('/incident', auth, teacherSettingController.deleteIncident);

module.exports = router;
