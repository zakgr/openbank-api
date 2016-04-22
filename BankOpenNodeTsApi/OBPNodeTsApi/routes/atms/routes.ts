/*
 Api routes 
 */
//this is an interface to take katasthmata
import atms = require('../../implementation/atms/implementation');
var router = require('express').Router();
var isAuthenticated = require('../../isAuthenticated');

/* GET list */
//connect to legacy public services example
router.all('/list2', atms.list2);
/* GET list */
router.get('/list',  atms.list);
router.post('/list',  atms.list);

/* Rest Api Full */
router.get('/rest',  atms.list);
router.post('/rest',  atms.listmore);
router.put('/rest',  atms.set);
router.delete('/rest',  atms.del);

///* GET set */
router.post('/set', atms.set);

///* GET del */
router.post('/del', atms.del);

module.exports = router;
module.exports = router;