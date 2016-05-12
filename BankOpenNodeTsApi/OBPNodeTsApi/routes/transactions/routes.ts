/*
 Api routes 
 */
//this is an interface to take transactions
import passport = require('passport');
import transactions = require('../../implementation/transactions/implementation');
var router = require('express').Router();
var path = '/transactions';

/* Rest Api Full */
router.get(path, passport.authenticate('custom'), transactions.list);
router.post(path, passport.authenticate('custom'),  transactions.listmore);
router.put(path, passport.authenticate('custom'), transactions.set);
router.delete(path, passport.authenticate('custom'),  transactions.del);

module.exports = router;