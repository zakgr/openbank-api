/*
 Api routes 
 */
var isAuthenticated = require('../../isAuthenticated');
import products = require('../../implementation/products/implementation');
var router = require('express').Router();

/* GET list */
router.get('/list',  products.list);
router.post('/list',  products.list);

/* Rest Api Full */
router.get('/rest',  products.list);
router.post('/rest',  products.listmore);
router.put('/rest',  products.set);
router.delete('/rest',  products.del);

/* GET set */
router.post('/set',  products.set);

/* GET del */
router.post('/del',   products.del);

module.exports = router;
