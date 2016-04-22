/*
 Api routes 
 */
var isAuthenticated = require('../../isAuthenticated');
import events = require('../../implementation/events/implementation');
var router = require('express').Router();

/* GET list */
router.get('/list',  events.list);
router.post('/list',  events.list);

/* Rest Api Full
router.get('/rest',  events.list);
router.post('/rest',  events.listmore);
router.put('/rest',  events.set);
router.delete('/rest',  events.del); */

/* GET get */
router.post('/get',  events.get);

/* GET set */
router.post('/set',  events.set);

/* GET del */
router.post('/del',   events.del);

module.exports = router;
