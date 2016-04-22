/*
 Api routes 
 */
var isAuthenticated = require('../../isAuthenticated');

import customers = require('../../implementation/customers/implementation');
var router = require('express').Router();

/* GET list */
router.get('/list',  customers.list);
router.post('/list',  customers.list);

/* Rest Api Full */
router.get('/rest',  customers.list);
router.post('/rest',  customers.listmore);
router.put('/rest',  customers.set);
router.delete('/rest',  customers.del);

/* GET set */
router.post('/set', customers.set);

/* GET del */
router.post('/del',  customers.del);

module.exports = router;
