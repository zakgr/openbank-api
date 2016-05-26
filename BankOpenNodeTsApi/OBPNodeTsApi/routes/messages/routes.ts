/*
 Api routes 
 */
import passport = require('passport');
import messages = require('../../implementation/messages/implementation');
var router = require('express').Router();
var path = '/messages';

/* Rest Api Full */
router.get('/banks/:bid' + path, passport.authenticate('custom'), messages.listbid);//get all message of a bank by id
router.post('/banks/:bid' + path, passport.authenticate('custom'), messages.listmore);//search
router.put('/banks/:bid' + path, passport.authenticate('custom'), messages.set);//insert new message

router.get('/banks/:bid' + "/customer" + path, passport.authenticate('custom'), messages.listid2);//insert new customer
router.put('/banks/:bid' + "/customer" + '/:cid' + path, passport.authenticate('custom'), messages.set);//update existing message
router.put('/banks/:bid' + "/customer" + '/:cid' + path+'/:id', passport.authenticate('custom'), messages.set);//update existing message

router.get('/banks/:bid' + path + '/:id', passport.authenticate('custom'), messages.listid);//get one message of a bank by id
router.put('/banks/:bid' + path + '/:id', passport.authenticate('custom'), messages.set);//update existing message
router.delete('/banks/:bid' + path + '/:id', passport.authenticate('custom'), messages.del);//delete with id

module.exports = router;
