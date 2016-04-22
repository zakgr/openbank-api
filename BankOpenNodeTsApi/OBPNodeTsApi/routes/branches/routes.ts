/*
 Api routes 
 */
//this is an interface to take katasthmata
import branches = require('../../implementation/branches/implementation');
var router = require('express').Router();
var isAuthenticated = require('../../isAuthenticated');

/* GET list */
//connect to legacy public services example
router.all('/list2', branches.list2);
/* GET list */
router.get('/list',  branches.list);
router.post('/list',  branches.list);

/* Rest Api Full */
router.get('/rest',  branches.list);
router.post('/rest',  branches.listmore);
router.put('/rest',  branches.set);
router.delete('/rest',  branches.del);

///* GET set */
router.post('/set', branches.set);

///* GET del */
router.post('/del', branches.del);

module.exports = router;