import express = require('express');
import config = require('config');
var router = express.Router();
var isAuthenticated = require('../isAuthenticated');
import usersservice = require('../services/users/service');
import usersmodels = require('../models/users/model');
import requestIp = require('request-ip');
//passport setup
export import passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');
passport.use(new OAuth2Strategy({
    authorizationURL: config.get<string>('authConfigs.internaloauth.authorizationURL') ,
    tokenURL: config.get<string>('authConfigs.internaloauth.tokenURL') ,
    clientID: config.get<string>('authConfigs.internaloauth.clientID') ,
    clientSecret: config.get<string>('authConfigs.internaloauth.clientSecret') ,
    callbackURL: config.get<string>('authConfigs.internaloauth.callbackURL') 
},
    function (accessToken, userData, empty, done) {

        done(null,userData);
    }
));
passport.serializeUser(function (user, done) {
    console.log('done.serializeUser...');
    done(null, user);

});
passport.deserializeUser(function (id, done) {
    console.log('done.deserializeUser...');
    done(null, id);
});

router.all('/login', passport.authenticate('oauth2'), function (req: any, res, next) {
    
    //Check user update or create
    var clientIp = requestIp.getClientIp(req);
    console.log("user: ", req.user);
    var data: any = {
        userId: req.user.id,
        userName: req.user.username,
        name: req.user.name,
        authCode: req.user.authCode,
        userIp: req.connection.remoteAddress
    }; 
    if (req.headers['x-forwarded-for']) { data.userIp = req.connection.remoteAddress }
    usersservice.set("{_id: '" + req.user.id + "'}", data).then(
        function (resp) {
            console.log("resp user insert: ", resp);
            res.cookie("naccessid", resp, { maxAge: 900000, httpOnly: true });
            res.cookie("naccessuser", data.userName, { maxAge: 900000, httpOnly: true });
            res.redirect('/auth/logindone');
        } );
});
router.all('/logindone', isAuthenticated, function (req: any, res, next) {
    res.json('login ok. Cookie established');
});
router.get('/logout', isAuthenticated, function (req: any, res, next) {
    usersservice.del("{_id: '" + req.cookies.naccessid + "'}").then(
        function (resp) {
            console.log("resp user delete: ", resp);
            res.redirect('/');
        });
});
router.get('/logindone2', isAuthenticated, function (req: any, res, next) {
    res.json('login ok. Cookie established2');
});
module.exports = router;