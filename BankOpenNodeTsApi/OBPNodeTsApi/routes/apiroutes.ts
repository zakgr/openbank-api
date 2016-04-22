/*
 Api routes 
 */
var router = require('express').Router();
var isAuthenticated = require('../isAuthenticated');

// split up route handling
router.use('/banks', require('./banks/routes'));
router.use('/branches', require('./branches/routes'));
router.use('/atms', require('./atms/routes'));
router.use('/customers', require('./customers/routes'));
router.use('/products', require('./products/routes'));
router.use('/accounts', require('./accounts/routes'));
router.use('/metadata', require('./metadata/routes'));
router.use('/socials', require('./socials/routes'));
router.use('/events', require('./events/routes'));
router.use('/transactions', require('./transactions/routes'));
router.use('/otherAccounts', require('./otherAccounts/routes'));

// etc.
router.get('/logindone2', isAuthenticated, function (req: any, res, next) {
    res.json('login ok. Cookie established2');
});

module.exports = router;