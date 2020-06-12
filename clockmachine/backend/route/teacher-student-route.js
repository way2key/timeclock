const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherStudentController = require('../controller/teacher-student-controller');

//Routes
router.get('/', auth, teacherStudentController.getAllStudents);
router.get('/teacher', auth, teacherStudentController.getATeacher);
router.get('/:id', auth, teacherStudentController.getAStudentById);
router.get('/presence/:id', teacherStudentController.getStudentPresence);
router.post('/log', auth, teacherStudentController.createLog);
router.put('/time', auth, teacherStudentController.updatePerformedTime);
router.put('/week', auth, teacherStudentController.updateStudentWeek);
router.put('/hash', auth, teacherStudentController.updateStudentHash);
router.put('/presence', auth, teacherStudentController.updatePresence);
router.delete('/:id', auth, teacherStudentController.deleteStudent);


module.exports = router;
