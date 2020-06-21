const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminDataTeacherController = require('../controller/admin-data-teacher-controller');

//Routes
router.get('/', adminDataTeacherController.getAllTeachers);
router.post('/', auth, adminDataTeacherController.createATeacher);
router.delete('/:teacherId', auth, adminDataTeacherController.deleteTeacher);

module.exports = router;
