const express = require('express');
const teacherDB = express();
const network = require('../network');

const mongoose = require('mongoose');
mongoose.connect('mongodb://' + network.clockmachineDB + ':27017/pointeuse',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = teacherDB;
