/*
 Api routes 
 */
var isAuthenticated = require('../../isAuthenticated');
import accounts = require('../../implementation/accounts/implementation');
var router = require('express').Router();

/* GET list */
router.get('/list',  accounts.list);
router.post('/list',  accounts.list);

/* Rest Api Full */
router.get('/rest',  accounts.list);
router.post('/rest',  accounts.listmore);
router.put('/rest',  accounts.set);
router.delete('/rest',  accounts.del);
/* GET get */
router.post('/get',  accounts.get);

/* GET set */
router.post('/set',  accounts.set);

/* GET del */
router.post('/del',   accounts.del);

module.exports = router;
