const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminAuthController = require('../controller/admin-auth-controller');

//Routes
router.get('/verifyToken/:token', adminAuthController.verifyToken);
router.get('/verifyToken/admin/:token', adminAuthController.verifyAdminToken);
router.post('/signup/admin', adminAuthController.signupAdmin);
router.post('/login', adminAuthController.login);
router.put('/password/:password', adminAuthController.updatePassword);

module.exports = router;
