/*
 Api routes 
 */
import passport = require('passport');
import customers = require('../../implementation/customers/implementation');
var router = require('express').Router();
var path = '/customers';

/* Rest Api Full */
router.get('/banks/:bid' + path, passport.authenticate('custom'), customers.listbid);//get all customer of a bank by id
router.post('/banks/:bid' + path, passport.authenticate('custom'), customers.listmore);//search
router.put('/banks/:bid' + path, passport.authenticate('custom'), customers.set);//insert new customer

router.get('/banks/:bid' + "/customer", passport.authenticate('custom'), customers.listid2);//insert new customer

router.get('/banks/:bid' + path + '/:id', passport.authenticate('custom'), customers.listid);//get one customer of a bank by id
router.put('/banks/:bid' + path + '/:id', passport.authenticate('custom'), customers.set);//update existing customer
router.delete('/banks/:bid' + path + '/:id', passport.authenticate('custom'), customers.del);//delete with id

module.exports = router;
