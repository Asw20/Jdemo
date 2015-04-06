var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var i18n = require('i18n');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

i18n.configure({
	// setup some locales - other locales default to en silently
	locales: ['en', 'fr', 'es'],
    // you may alter a site wide default locale
    defaultLocale: 'en',
    // whether to write new locale information to disk - defaults to true
    updateFiles: true,
	// sets a custom cookie name to parse locale settings from
	// cookie: 'cooklang',
	// where to store json files - defaults to './locales'
	directory: __dirname + '/locales'
}); 

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//i18n init parses req for language headers, cookies, etc.
app.use(i18n.init); 

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
