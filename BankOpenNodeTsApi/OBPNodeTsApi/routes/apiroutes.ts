/*
 Api routes 
 */
var router = require('express').Router();
import fs = require('fs');
import path = require('path');
var isAuthenticated = require('../isAuthenticated');

/*
// split up route handling
router.use('/banks', require('./banks/routes'));
router.use('/banks', require('./branches/routes'));
router.use('/banks', require('./atms/routes'));
*/

//Replace old express rooting 
//with auto include any module in routes folder 
//scan / folder and add all subfolders
fs.readdirSync(__dirname).forEach(function (filename) {    
    //exclude files from folder
    if (filename.indexOf('.')==-1) {
        router.use('/', require('./' + filename + '/routes'));
    }
});

//more routes
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Hi. Welcome to the new Open Node Bank Api' });
});
/* GET home page. */
router.get('/Licence', function (req, res, next) {
    res.render('Licence');
});


module.exports = router;