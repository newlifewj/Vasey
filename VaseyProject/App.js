/* Set application running mode */
//process.env.NODE_ENV = "production";		//Default is 'development'

/* Define some global variables */
	global.__appBase = __dirname+'/';		//__appBase is the absolute directory of application root.
	
	
/* require modules required in the main routine */
	var express = require('express');
	var path = require('path');			//path is a built-in modules in Node.js
	var favicon = require('serve-favicon');
	var logger = require('morgan');


/* Maybe these request parsers should included and performed in relevant router */
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');


/* require all routers -- three routers are deployed */
	var dynamicTemplate = require('./routes/dynamicTemplate');
	var jsonRest = require('./routes/json-rest');
	var host = require('./routes/host');	//host app is not a router -- or special route


/* Create server-app */
	var app = express();


/* The following script are scaffolding the created App, setting properties and deploy middlewares (interceptors) */
	//The the path of view templates - so render() can find them. '__dirname' is the builtin variable standing for 'current directory'.
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');		//set the template engine
	
	//Deploy middleware provide favicon
	app.use(favicon(__dirname + '/resource/images/angularShield.png'));
	
	//Mount the logger according to different running mode
	if(app.get('env') === 'development'){
		app.use(logger('dev'));
	}else{
		app.use(logger('tiny'));
	}
	
	//Mount the public static files retrieving middleware - for .js, .css, .html, ...
	app.use(express.static(path.join(__dirname, 'resource')));
	
	
	//Intercept to provide host-page, only '/' lead to host-page and only GET makes sense.
	app.get('/', function(req, res, next){
		if(req.path === '/'){
			 host(req,res);		//Invoke the host middleware.
		}else{
			next();		//If not '/', continue.
		}
	});
	
	
	//Mount request parsers -- But maybe they should be performed in relevant router on demand
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	
	//Dispatch router for ejs-template rendering (dynamic view unit as AngularJS template)
	app.use('/ejs', dynamicTemplate);
	
	//Dispatch requests to routers
	app.use('/', jsonRest);
	
	if (app.get('env') === 'development') {
		//Test is only available in developing stage.
		var test = require('./dev/e2e/testRouter.js');
		var doc = require('./dev/doc/docRouter.js');
		app.use('/_test',test);
		app.use('/_doc',doc);
	};
	
	//catch 404 and forward to error handler for requests without matching all the previous interceptor.
	app.use(function(req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});
	
	
	//Error handlers. Up to now, there must be data passed through next()!!!
	
	//development-mode error handler, will print stack-trace
	if (app.get('env') === 'development') {
	    app.use(function(err, req, res, next) {
	        res.status(err.status || 500);
	        res.render('error', {'err': err});
	    });
	}
	
	//production-mode error handler, only a short message without stack-traces leaked to user
	app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {'err': {message: err.message, status:'',stack:''}});
	});


module.exports = app;


/* ------- Dependencies Introduction ------- */
/*
  1, express:	The web server framework or MVC.
  2, serve-favicon:	Middleware module to specify and provide favorite icon for current App.
  3, path:		Not a third-party module. Internal module of Node.js process director path.
  4, morgan:	Middleware module for logging to console, log-modes: 'combined','dev','common','short' and 'tiny'.
  5, body-parser:	Middleware parsing the request-body into specified format data, 
  	 and then attach the result to 'req.body'. 
  6, cookie-parser:	Middleware parsing cookies in request-head, 
     then attach the result key-value pairs to res.cookies. 
  7, 
 */
