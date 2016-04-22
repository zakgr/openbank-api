import express = require('express');
import http = require('http');
import https = require('https');
import path = require('path');
import mongoose = require('mongoose');
import errorhandler = require('errorhandler')
import logger = require('morgan')
import favicon = require('serve-favicon')
import config = require('config');
import bodyParser = require('body-parser')
import cookieParser = require('cookie-parser')
import passport = require('passport');
import validator = require('validator');
var middleware = require('swagger-express-middleware');

// This line is from the Node.js HTTPS documentation.
var fs = require('fs');
var options = {
    key: fs.readFileSync('keys/key.pem'),
    cert: fs.readFileSync('keys/cert.pem')
};

 
//connect database
mongoose.connect(config.get<string>('dbConfigs.mongodb.connectionstring'));

// all environments
var app = express();

// warning this code overrides ssl not ok for pd
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, fakelogin");
    //res.header("Access-Control-Allow-Methods", "*")
    //res.header("Access-Control-Allow-Headers", "*")
    next();
});

app.set('port', process.env.PORT || config.get<number>('maincfg.runningport'));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(cookieParser())
app.use(favicon(__dirname + '/public/images/api.ico'));
app.use(logger('dev'));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

//swagger middleware
middleware(__dirname + '/public/api.json', app, function (err, middleware) {
    // Add all the Swagger Express Middleware, or just the ones you need.
    // NOTE: Some of these accept optional options (omitted here for brevity)
    app.use(
        middleware.metadata(),
        //middleware.CORS(),
        middleware.files()
        //middleware.parseRequest(),
        //middleware.validateRequest(),
        //middleware.mock()
    );
});

//filter middlware for NBG ID AND PAYLOAD
app.use(function (req: express.Request, res, next) {
   // console.log('req.method', req.method);
    if (req.method == 'POST'
    || req.method == 'PUT'
    || req.method == 'DELETE'
    ) {
        if (!req.body.nbgtrackid)
        { res.status(500).send('Error!no nbgtrackid'); next('Error!no nbgtrackid'); }
        else if (!validator.isUUID(req.body.nbgtrackid) && !validator.isMongoId(req.body.nbgtrackid))
        { res.status(500).send('Error!nbgtrackid must be a valid UUID'); next('Error!nbgtrackid must be a valid UUID'); }
        else if (!req.body.payload)
        { res.status(500).send('Error!no payload'); next('Error!no payload'); }
        else if (typeof req.body.payload == 'string')
        { res.status(500).send('Error!payload cannot be string'); next('Error!payload cannot be string'); }
    } 
    next();
});
//Route start
app.use('/', require('./routes/mainroutes'));
app.use('/api', require('./routes/apiroutes'));
app.use('/auth', require('./routes/auth'));
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

https.createServer(options, app).listen(443, function () {
    console.log('Express server http listening on port 443');
});

 