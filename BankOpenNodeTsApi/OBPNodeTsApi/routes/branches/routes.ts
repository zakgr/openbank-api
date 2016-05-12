/*
 Api routes 
 */
//this is an interface to take katasthmata
import passport = require('passport');
import branches = require('../../implementation/branches/implementation');
var router = require('express').Router();
var path = '/branches';

/* Rest Api Full */
router.get('/banks/:bid' + path, branches.listbid);//get all atm of a bank by id
router.post('/banks/:bid' + path, branches.listmore);//search
router.put('/banks/:bid' + path, passport.authenticate('custom'), branches.set);//insert new atm

router.get('/banks/:bid' + path + '/:id', branches.listid);//get one atm of a bank by id
router.put('/banks/:bid' + path + '/:id', passport.authenticate('custom'), branches.set);//update existing atm
router.delete('/banks/:bid' + path + '/:id', passport.authenticate('custom'), branches.del);//delete with id

module.exports = router;