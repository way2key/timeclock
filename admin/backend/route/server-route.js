const express = require('express');
const router = express.Router();

const serverController = require('../controller/server-controller');

//Routes
router.get('/user/:token', serverController.getUserFromToken);
module.exports = router;
