/*
 Api routes 
 */
import passport = require('passport');
import banks = require('../../implementation/banks/implementation');
var router = require('express').Router();
var path = '/banks';

/* Rest Api Full */
router.get(path, banks.list);//listall
router.post(path, banks.listmore);//search
router.put(path, passport.authenticate('custom'), banks.set);//insert new bank

router.get(path + '/:id', banks.listid);//get by id
router.put(path + '/:id', passport.authenticate('custom'),  banks.set);//update existing bank
router.delete(path + '/:id', passport.authenticate('custom'),  banks.del);//delete with id

module.exports = router;
