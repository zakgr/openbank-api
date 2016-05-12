/*
 Api routes 
 */
//this is an interface to take otherAccounts
import passport = require('passport');
import otherAccounts = require('../../implementation/otherAccounts/implementation');
var router = require('express').Router();
var path = '/other_accounts';

/* Rest Api Full */
router.get('/banks/:bid/accounts/:acid/:vid' + path, passport.authenticate('custom'), otherAccounts.listbid);//get all other account of a bank by id
router.post('/banks/:bid/accounts/:acid/:vid' + path, passport.authenticate('custom'), otherAccounts.listmore);//search
router.put('/banks/:bid/accounts/:acid/:vid' + path, passport.authenticate('custom'), otherAccounts.set);//insert other account

router.get('/banks/:bid/accounts/:acid/:vid' + path + '/:id', passport.authenticate('custom'), otherAccounts.listid);//get one other account of a bank by id
router.put('/banks/:bid/accounts/:acid/:vid' + path + '/:id', passport.authenticate('custom'), otherAccounts.set);//update existing other account
router.delete('/banks/:bid/accounts/:acid/:vid' + path + '/:id', passport.authenticate('custom'),otherAccounts.del);//delete with id

module.exports = router;