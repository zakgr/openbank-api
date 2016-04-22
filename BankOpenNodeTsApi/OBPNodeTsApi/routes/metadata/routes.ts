/*
 Api routes 
 */
var isAuthenticated = require('../../isAuthenticated');
import metadatas = require('../../implementation/metadata/implementation');
var router = require('express').Router();

/* GET list */
router.get('/list',  metadatas.list);
router.post('/list',  metadatas.list);

/* Rest Api Full */
router.get('/rest',  metadatas.list);
router.post('/rest',  metadatas.listmore);
router.put('/rest',  metadatas.set);
router.delete('/rest',  metadatas.del);
/* GET set */
router.post('/set',  metadatas.set);

/* GET del */
router.post('/del',   metadatas.del);

module.exports = router;
