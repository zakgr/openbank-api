/*
 Api routes 
 */
//this is an interface to take views
import passport = require('passport');
import views = require('../../implementation/views/implementation');
var router = require('express').Router();
var path = '/views';

/* Rest Api Full */
router.get('/banks/:bid' + path, views.listbid);//get all public views with no owners
router.put('/banks/:bid' + path, passport.authenticate('custom'), views.set);//insert view
router.put('/banks/:bid' + path + '/:id', passport.authenticate('custom'), views.set);//update existing view
router.delete('/banks/:bid' + path + '/:id', passport.authenticate('custom'), views.del);//delete with id

// /banks/:bid/accounts/:acid  + path .you will find this in account
// /banks/:bid/accounts/:acid' + path + '/:id',you will find this in account
router.put('/banks/:bid/accounts/:acid' + path, passport.authenticate('custom'), views.set);//insert other account
router.put('/banks/:bid/accounts/:acid' + path + '/:id', passport.authenticate('custom'), views.set);//update existing other account
router.delete('/banks/:bid/accounts/:acid' + path + '/:id', passport.authenticate('custom'), views.del);//delete with id

module.exports = router;

