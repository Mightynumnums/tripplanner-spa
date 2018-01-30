const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const path = require('path');

const { db } = require('../models');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

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

const port = 3001;
app.listen(port, function() {
  console.log('The server is listening closely on port', port);
  db.sync({force: true})
    .then(function() {
      console.log('Synchronated the database');
    })
    .catch(function(err) {
      console.error('Trouble right here in River City', err, err.stack);
    });
});
