const express = require('express');
const bodyParser = require('body-parser');

const teacherDB = require('./database/teacherDB');

const teacherStudentRoute = require('./route/teacher-student-route.js');
const teacherAuthRoute = require('./route/teacher-auth-route.js');
const teacherSettingRoute = require('./route/teacher-setting-route.js');
const teacherDashboardRoute = require('./route/teacher-dashboard-route.js');
const teacherHistRoute = require('./route/teacher-hist-route.js');
const studentRoute = require('./route/student-route.js');
const serverRoute = require('./route/server-route.js');

const api = express();

api.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

api.use(bodyParser.json());

api.use('/api/teacher-student', teacherStudentRoute);
api.use('/api/teacher-auth', teacherAuthRoute);
api.use('/api/teacher-setting', teacherSettingRoute);
api.use('/api/teacher-dashboard', teacherDashboardRoute);
api.use('/api/teacher-hist', teacherHistRoute);

api.use('/api/student', studentRoute);

api.use('/api/server', serverRoute);


module.exports = api;
