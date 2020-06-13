const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const teacherAuthController = require('../controller/teacher-auth-controller');

//Routes
router.post('/signup/user', teacherAuthController.signupUser);

module.exports = router;
