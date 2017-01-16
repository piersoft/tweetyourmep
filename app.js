
/**
 * Module dependencies.
 */

var express = require('express');
var controllers = require("./controllers");
var user = require('./controllers/user');
var http = require('http');
var path = require('path');
var  mongoose = require('mongoose');

// bootstrap the app!
var app = express();
var model = require('./models/mep.js');
var config = require('./config.js');


app.configure(function(){
	app.set('port', process.env.PORT || config.app_port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser(config.app_secret));
	app.use(express.session());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', controllers.mainController().indexAction);
app.get('/about', controllers.mainController().aboutAction);
app.get('/italiano', controllers.mainController().italianoAction);

// API
app.get('/api/meps', controllers.mainController().apiAction.get);

// disabled at this stage
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

