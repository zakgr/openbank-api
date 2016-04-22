import express = require('express');
import usersservice = require('./services/users/service');
import requestIp = require('request-ip');

function isAuthenticated(req: express.Request, res, next) {
        if (
            (req.cookies.fakelogin && req.cookies.fakelogin === "true" )||
            (req.body.fakelogin && req.body.fakelogin === "true" )
            ) {
                    console.log("in next");
             return next();
        } else { console.log("in redirect"); return res.redirect('/getcookie') }

}
//function isAuthenticated(req, res, next) {  
//        console.log("------------------- start is auth  ------------------------------------");
//        var clientIp = requestIp.getClientIp(req);
//        console.log("ip: ", clientIp);
//        console.log("Cookies1: ", req.cookies.naccessid);
//        console.log("Cookies2: ", req.cookies.naccessuser);
//
//        if (req.headers['x-forwarded-for']) { clientIp = req.connection.remoteAddress }
//        console.log("------------------- req ask  ------------------------------------");
//        if (req.cookies.naccessid) {
//            console.log("------------------- mongo ask  ------------------------------------");
//            usersservice.list("{_id: '" + req.cookies.naccessid + "'}").then(
//                function (resp: any) {
//                    console.log("------------------- check resp  ------------------------------------");
//                    console.log("resp user return: ", resp);
//                    if (!resp) { return res.redirect('/auth/login'); }
//                    console.log("------------------- before ok  ------------------------------------");
//                    console.log(resp.userIp);
//                    console.log(clientIp);
//                    console.log(resp.userName);
//                    console.log(req.cookies.naccessuser);

//                    if ((JSON.stringify(resp.userIp) === JSON.stringify(clientIp)) ||
//                        (JSON.stringify(resp.userName) === JSON.stringify(req.cookies.naccessuser))
 //                   ) {
 //                       console.log("------------------- auth ok  ------------------------------------");
 //                       return next();
 //                   }
 //                   return res.redirect('/auth/login');
 //               });
  //      } else { return res.redirect('/auth/login') }

//}
module.exports = isAuthenticated;