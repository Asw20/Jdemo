var express = require('express');
var path = require('path');
//var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//###Asw20 Configure Database and connect
var dbConfig = require('./conf/db');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url);
//###Asw20 ------------------------------

//###Asw20 Declare roles function middleware
var userRoles = require('./lib/middleware/roles');
//###Asw20 ------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//###Asw20 Configuring Passport and express-session
var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({
	secret: 'Ja1Du80nTa8ac',
    resave: true,
    saveUninitialized: true
    }));
app.use(passport.initialize());
app.use(passport.session());
//###Asw20 ---------------------------------------

//###Asw20 Configure flash message
var flash = require('connect-flash');
app.use(flash());
//###Asw20 ---------------------------------------

//###Asw20 Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);
//###Asw20 -----------------------------------

//###Asw20 Add Initialize Roles
app.use(userRoles());
//###Asw20 -----------------------------------

var routes = require('./routes/index')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;
