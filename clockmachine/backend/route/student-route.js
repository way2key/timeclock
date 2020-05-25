const express = require('express');
const router = express.Router();

const studentController = require('../controller/student-controller');

//Routes
router.get('/status/:hash', studentController.getStudentStatus);
router.get('/meal/:hash', studentController.getStudentMeal);
router.get('/breather/:hash', studentController.getStudentBreather);
router.get('/clock/:hash', studentController.getStudentClock);
router.get('/day-time/:hash', studentController.getStudentDayTime);
router.get('/:hash', studentController.getStudentInfo);
router.post('/', studentController.clockAStudent);

module.exports = router;
