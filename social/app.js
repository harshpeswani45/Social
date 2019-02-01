var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose')
var path = require('path');
var fileUpload = require('express-fileupload')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(session({'secret':'fireheart102'}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload());

mongoose.connect('mongodb://localhost:27017/Facebook',{
    useNewUrlParser : true
  })

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler


module.exports = app;
