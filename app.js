const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRoutes = require('./routes/apiRoutes');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/virtusaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.info('connetion to mondodb successfully done');
}).catch((error) => {
  console.error(error.message);
  process.exit(0); 
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err) {
    res.status(404);
    res.json({
      message: 'Server error during api call',
      error: err.message
    });
  }
});

module.exports = app;
