/*
 Api routes 
 */
import passport = require('passport');
import products = require('../../implementation/products/implementation');
var router = require('express').Router();
var path = '/products';

/* Rest Api Full */
router.get('/banks/:bid' + path, products.listbid);//listall
router.post('/banks/:bid' + path, products.listmore);//search
router.put('/banks/:bid' + path, passport.authenticate('custom'), products.set);//insert new products

router.get('/banks/:bid' + path + '/:id', products.listid);//get by id
router.put('/banks/:bid' + path + '/:id', passport.authenticate('custom'), products.set);//update existing products
router.delete('/banks/:bid' + path + '/:id', passport.authenticate('custom'), products.del);//delete with id

module.exports = router;
