const express = require('express');
const adminDB = express();
const network = require('../network');

const mongoose = require('mongoose');
mongoose.connect('mongodb://' + network.adminDB + ':27017/admin',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = adminDB;
