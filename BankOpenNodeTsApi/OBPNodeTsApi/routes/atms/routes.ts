/*
 Api routes 
 */
//this is an interface to take katasthmata
import passport = require('passport');
import atms = require('../../implementation/atms/implementation');
var router = require('express').Router();
var path = '/atms';

/* Rest Api Full */
router.get('/banks/:bid' + path, atms.listbid);//get all atm of a bank by id
router.post('/banks/:bid' + path, atms.listmore);//search
router.put('/banks/:bid' + path, passport.authenticate('custom'), atms.set);//insert new atm

router.get('/banks/:bid' + path + '/:id', atms.listid);//get one atm of a bank by id
router.put('/banks/:bid' + path + '/:id', passport.authenticate('custom'), atms.set);//update existing atm
router.delete('/banks/:bid' + path + '/:id', passport.authenticate('custom'), atms.del);//delete with id

module.exports = router;