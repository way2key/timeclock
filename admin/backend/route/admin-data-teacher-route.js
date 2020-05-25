const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminDataTeacherController = require('../controller/admin-data-teacher-controller');

//Routes
router.post('/', auth, adminDataTeacherController.createATeacher);
router.get('/', adminDataTeacherController.getAllTeachers);
router.delete('/:teacherId', auth, adminDataTeacherController.deleteTeacher);

module.exports = router;
