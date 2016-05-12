/*
 Api routes 
 */
//this is an interface to take katasthmata
import passport = require('passport');
import users = require('../../implementation/users/implementation');
var router = require('express').Router();

/* Rest Api Full */
//router.all('/user', passport.authenticate('custom'), function (req: any, res, next) {
//    res.json(req.user);
//});

router.get('/user', passport.authenticate('custom'), users.listmore);
router.put('/user', users.set);
router.put('/user/:id', passport.authenticate('custom'), users.set);
module.exports = router;