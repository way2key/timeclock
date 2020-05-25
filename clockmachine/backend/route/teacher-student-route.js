const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherStudentController = require('../controller/teacher-student-controller');

//Routes
router.post('/time', auth, teacherStudentController.modifyPerformedTime);
router.post('/log', auth, teacherStudentController.createLog);
router.post('/week', auth, teacherStudentController.updateStudentWeek);
router.post('/hash', auth, teacherStudentController.updateStudentHash);
router.get('/presence/:hash', teacherStudentController.getStudentPresence);
router.get('/teacher', auth, teacherStudentController.getATeacher);
router.get('/:id', auth, teacherStudentController.getAStudent);
router.get('/', auth, teacherStudentController.getAllStudents);
router.put('/presence', auth, teacherStudentController.modifyPresence);
router.delete('/:id', auth, teacherStudentController.deleteStudent);


module.exports = router;
