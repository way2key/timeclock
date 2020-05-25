const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherAuthController = require('../controller/teacher-auth-controller');

//Routes
router.get('/verifyToken/:token', teacherAuthController.verifyToken);

router.post('/login', teacherAuthController.login);
router.post('/signup/admin', teacherAuthController.signupAdmin);
router.post('/signup/user', teacherAuthController.signupUser);

module.exports = router;
