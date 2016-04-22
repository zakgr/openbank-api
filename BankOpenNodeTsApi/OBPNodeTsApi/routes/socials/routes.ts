/*
 Api routes 
 */
var isAuthenticated = require('../../isAuthenticated');
import socials = require('../../implementation/socials/implementation');
var router = require('express').Router();

/* GET list */
router.get('/list',  socials.list);
router.post('/list',  socials.list);

/* Rest Api Full 
router.get('/rest',  socials.list);
router.post('/rest',  socials.listmore);
router.put('/rest',  socials.set);
router.delete('/rest',  socials.del); */

/* GET set */
router.post('/set',  socials.set);

/* GET del */
router.post('/del',   socials.del);

module.exports = router;
