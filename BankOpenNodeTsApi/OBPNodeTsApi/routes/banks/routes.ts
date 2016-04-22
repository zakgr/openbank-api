/*
 Api routes 
 */
var isAuthenticated = require('../../isAuthenticated');
import banks = require('../../implementation/banks/implementation');
var router = require('express').Router();

/* GET list */
router.get('/list',  banks.list);
router.post('/list',  banks.list);

/* Rest Api Full */
router.get('/rest',  banks.list);
router.post('/rest',  banks.listmore);
router.put('/rest',  banks.set);
router.delete('/rest',  banks.del);

/* GET get */
router.post('/get',  banks.get);

/* GET set */
router.post('/set',  banks.set);

/* GET del */
router.post('/del',   banks.del);

module.exports = router;
