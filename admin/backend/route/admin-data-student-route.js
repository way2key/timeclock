const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminDataStudentController = require('../controller/admin-data-student-controller');

//Routes
router.get('/', auth, adminDataStudentController.getAllStudents);
router.post('/', adminDataStudentController.createAStudent);
router.put('/', auth, adminDataStudentController.allotStudent);
router.delete('/:id', auth, adminDataStudentController.deleteStudent);

module.exports = router;
