// App Settings
require('dotenv').load();

// App Modules
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var util = require('./modules/util/basic');

// Express Setup
var port = util.parseInt(process.env.PORT);
var app = express();
if (process.env.NODE_ENV === 'dev') app.use(morgan('dev'));
else app.use(morgan('tiny'));
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', './author/img/favicon.png')));

// Route setup
//var index = require('./routes/index');

app.get('/', function(req, res) {
    return res.render('skeleton.pug', {});
});

app.get('/test', function(req, res) {
    return res.render('content/test.pug');
});

// Handlers
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    return next(err);
});

app.use(function (err, req, res) {
    res.status(err.status || 500);
    return res.send(err.message);
});

app.set('port', port);
var server = app.listen(app.get('port'), function () {
    return util.verbose('Server listening on port ' + server.address().port);
});

module.exports = server;