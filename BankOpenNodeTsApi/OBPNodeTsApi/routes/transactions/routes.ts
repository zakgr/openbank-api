/*
 Api routes 
 */
//this is an interface to take transactions
import passport = require('passport');
import transactions = require('../../implementation/transactions/implementation');
var router = require('express').Router();
var path = '/transactions';

/* Rest Api Full */

router.put('/banks/:bid/accounts/:acid/:vid/transaction-request-types/:type/transaction-requests',
 passport.authenticate('custom'), transactions.set);
router.put('/banks/:bid/transaction-request-types/:type/transaction-requests',
 passport.authenticate('custom'), transactions.set);
//router.get('/banks/:bid/accounts/:acid/:vid/transaction-request-types/',
 //passport.authenticate('custom'), transactions.gettypes);
//router.get('/banks/:bid/accounts/:acid/:vid/transaction-requests',
 //passport.authenticate('custom'), transactions.listrequest);
router.get('/banks/:bid/accounts/:acid/:vid/transactions/:id/transaction',
 passport.authenticate('custom'), transactions.list);
router.delete('/banks/:bid/accounts/:acid/:vid/transactions/:id/transaction',
 passport.authenticate('custom'), transactions.del);
router.get('/banks/:bid/accounts/:acid/:vid/transactions',
 passport.authenticate('custom'), transactions.listmore);
router.post('/banks/:bid/accounts/:acid/:vid/transactions',
 passport.authenticate('custom'), transactions.listmore);


module.exports = router;