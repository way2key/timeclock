const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherDashboardController = require('../controller/teacher-dashboard-controller');

//Routes
router.get('/teacher', auth, teacherDashboardController.getATeacher);
router.get('/incident', auth, teacherDashboardController.getUntreatedIncident);
router.put('/incident', auth, teacherDashboardController.checkIncident);


module.exports = router;
