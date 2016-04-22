import express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Hi. Welcome to the new Nbg Open Api' });
});

//examples for cookies
router.all('/setcookie', function (req, res, next) {
    res.cookie('fakelogin', 'true', { maxAge: 900000, httpOnly: true });
    res.render('index', { title: 'cookie that represents a connected user established' });
});
router.all('/clearcookie', function (req, res, next) {
    res.clearCookie('fakelogin');
    res.render('index', { title: 'Access cookie cleared' });
});
// not in swagger
router.all('/getcookie', function (req, res, next) {
    console.log("Cookies: ", req.cookies.fakelogin);
    res.render('index', { title: "cookie auth : "  + req.cookies.fakelogin });
});

module.exports = router;
