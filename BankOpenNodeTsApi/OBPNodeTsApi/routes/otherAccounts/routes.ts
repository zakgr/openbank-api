/*
 Api routes 
 */
//this is an interface to take otherAccounts
import otherAccounts = require('../../implementation/otherAccounts/implementation');
var router = require('express').Router();
var isAuthenticated = require('../../isAuthenticated');

/* GET list */
router.get('/list',  otherAccounts.list);
router.post('/list',  otherAccounts.list);

/* Rest Api Full */
router.get('/rest',  otherAccounts.list);
router.post('/rest',  otherAccounts.listmore);
router.put('/rest',  otherAccounts.set);
router.delete('/rest',  otherAccounts.del);

///* GET set */
router.post('/set', otherAccounts.set);

///* GET del */
router.post('/del', otherAccounts.del);

module.exports = router;