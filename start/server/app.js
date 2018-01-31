const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const path = require('path');

const app = express();
const { db } = require('../models');
const routes = require('../routes');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

 app.use(express.static(path.join(__dirname, '../public')));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.send(
    'Do something funny it broke.'
  );
});

// app.listen(3000);

const port = 3000;
app.listen(port, function() {
  console.log('The server is listening closely on port', port);
  db.sync({})
    .then(function() {
      console.log('Synchronized the database');
    })
    .catch(function(err) {
      console.error('Trouble right here in River City', err, err.stack);
    });
});
