/*
 Api routes 
 */
//this is an interface to take transactions
import transactions = require('../../implementation/transactions/implementation');
var router = require('express').Router();
var isAuthenticated = require('../../isAuthenticated');

/* GET list */
router.get('/list',  transactions.list);
router.post('/list',  transactions.list);

/* Rest Api Full */
router.get('/rest',  transactions.list);
router.post('/rest',  transactions.listmore);
router.put('/rest',  transactions.set);
router.delete('/rest',  transactions.del);

///* GET set */
router.post('/set', transactions.set);

///* GET del */
router.post('/del', transactions.del);

module.exports = router;