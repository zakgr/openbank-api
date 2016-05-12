/*
 Api routes 
 */
import passport = require('passport');
import metadatas = require('../../implementation/metadata/implementation');
var router = require('express').Router();
var path = '/metadata';

/* Rest Api Full */
router.get(path , passport.authenticate('custom'),  metadatas.list);
router.post(path, passport.authenticate('custom'),  metadatas.listmore);
router.put(path, passport.authenticate('custom'), metadatas.set);
router.delete(path, passport.authenticate('custom'),  metadatas.del);

module.exports = router;
