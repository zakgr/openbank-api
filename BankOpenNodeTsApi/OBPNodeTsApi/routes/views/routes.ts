/*
 Api routes 
 */
//this is an interface to take views
import passport = require('passport');
import views = require('../../implementation/views/implementation');
var router = require('express').Router();
var path = '/views';

/* Rest Api Full */
router.get('/banks/:bid/accounts/:acid' + path, passport.authenticate('custom'), views.listbid);//get all other account of a bank by id
router.post('/banks/:bid/accounts/:acid' + path, passport.authenticate('custom'), views.listmore);//search
router.put('/banks/:bid/accounts/:acid' + path, passport.authenticate('custom'), views.set);//insert other account

router.get('/banks/:bid/accounts/:acid' + path + '/:id', passport.authenticate('custom'), views.listid);//get one other account of a bank by id
router.put('/banks/:bid/accounts/:acid' + path + '/:id', passport.authenticate('custom'), views.set);//update existing other account
router.delete('/banks/:bid/accounts/:acid' + path + '/:id', passport.authenticate('custom'), views.del);//delete with id

module.exports = router;