/*
 Api routes 
 */
import passport = require('passport');
import accounts = require('../../implementation/accounts/implementation');
var router = require('express').Router();
var path = '/accounts';

/* Rest Api Full */
router.get('/banks/:bid' + path, passport.authenticate('custom'), accounts.listbid);//listall
router.post('/banks/:bid' + path, passport.authenticate('custom'), accounts.listmore);//search
router.put('/banks/:bid' + path, passport.authenticate('custom'), accounts.set);//insert new bank

router.get('/banks/:bid' + path + '/:id', passport.authenticate('custom'), accounts.listid);//get by id
router.put('/banks/:bid' + path + '/:id', passport.authenticate('custom'), accounts.set);//update existing account
router.delete('/banks/:bid' + path + '/:id', passport.authenticate('custom'), accounts.del);//delete with id

module.exports = router;
