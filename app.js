require('dotenv').config()
require('./models/');
require('./lib/passport');


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DNS });

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cookie-session')({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.SECRET_SESSION || 'secret cat'],
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(Sentry.Handlers.requestHandler());

app.use('/', indexRouter); 
app.use('/auth', authRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(Sentry.Handlers.errorHandler());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
