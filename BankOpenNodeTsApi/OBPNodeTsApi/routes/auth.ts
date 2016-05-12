import express = require('express');
import config = require('config');
var router = express.Router();
var isAuthenticated = require('../isAuthenticated');
import usersservice = require('../services/users/service');
import usersmodels = require('../models/users/model');
//import requestIp = require('request-ip');
export import passport = require('passport');
router.all('/logincheck', passport.authenticate('custom'), function (req: any, res, next) {
    res.json('sucessfull');
});

router.post('/login', passport.authenticate('custom'), function (req: any, res, next) {
    res.json('sucessfull');
});

module.exports = router;