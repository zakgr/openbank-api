import viewsservice = require('../services/views/service');
import Q = require('q');

export function customcontainsregexp(string: string) {
    return new RegExp(string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "i");
}
export function bankpermissions(req) {
    return req.user.bank_permissions.filter(function (x) { return x.bank_id == req.params.bid; })[0];
}
export function bankscustomers(req) {
    return req.user.bank_permissions.filter(function (x) { return x.customer_id; });
}

//This function is for message error handling before calling the DB
export function check(checker) {
    var req = checker.params[0];
    var res = checker.params[1];
    var next = checker.params[2];
    //flag to check if there is an error on not
    var flag: Boolean;
    //status response to client
    var stat: number;
    var bankchecked: Boolean;
    function bank() {
        bankchecked = true;
        if (req.params.bid && !bankpermissions(req)) {
            message = "User has no relation with this bank";
            flag = true;
            stat = 412;
        }
        return;
    }
    function msg(str: string) {
        //var test = str.search('can_edit');
        if (str.search('can_edit') != -1) {
            str = 'can_edit';
        }
        else if (str.search('can_see') != -1) {
            str = 'can_see';
        }
        else if (str.search('can_add') != -1) {
            str = 'can_add';
        }
        return str;
    }
    for (var message of checker.field) {
        var tempmsg = msg(message);
        switch (tempmsg) {
            case 'data':
                if (JSON.stringify(req.body) === "{}") {
                    message = "No input data or wrong input data";
                    stat = 412;
                    flag = true;
                }
                break;
            case 'providers':
                function err2() {
                    stat = 501;
                    flag = true;
                    return;
                }
                if (req.body.providers.length === undefined || req.body.providers.length == 0) {
                    message = "No Provider Added";
                    err2()
                }
                else {
                    req.body.providers.forEach(function (prov, index) {
                        if (JSON.stringify(prov) === "{}") {
                            message = "One of the Providers is Empty";
                            err2()
                            return;
                        }
                        else {
                            for (var i = index + 1; i < req.body.providers.length; i++) {
                                if (prov.auth_provider_name == req.body.providers[i].auth_provider_name) {
                                    message = "Duplicate Provider found";
                                    err2()
                                    return;
                                }
                            }
                        }
                    });
                }
                break;
            case 'bank_id':
                bank()
                break;
            case 'customer_id':
                if (!bankchecked) { bank() }
                if (req.params.bid && !bankpermissions(req)[message]) {
                    message = "User is not a customer for this bank";
                    stat = 404;
                    flag = true;
                }
                break;
            case 'can_edit':
            case 'can_add':
            case 'can_see':
                //check if can do this process
                function err() {
                    message = "User has no " + message;
                    stat = 403;
                    flag = true;
                    return;
                }
                if (req.user[message] !== undefined) {
                    if (!req.user[message]) {
                        err();
                    }
                    break;
                }
                else {
                    if (!bankchecked) { bank() }
                    if (bankpermissions(req)[message] !== undefined) {
                        if (!bankpermissions(req)[message]) {
                            err();
                        }
                        break;
                    }
                }
            default:
                console.log('Field ' + message + ' Not Exist');
                flag = false;
                break;
        }
    }
    if (flag) {
        res.status(stat).send({ reqwas: req.body, error: message }); next(message)
        return false;
    }
    else return true;
}
export function response(resp, name, res, next) {
    if (resp['error']) {
        res.status(resp.status).send('Error: ' + resp.error); next(resp.error)
    }
    else if (resp['data']) {
        if (resp.data.constructor === Array) {
            for (var item in name) { name[item] = resp.data; resp.data = name; }
        }
        res.status(resp.status).send(resp.data);
    }
    else {
        // res.status(500).send(resp); //Uncomment to see the response
        res.status(500).send('Server Error');
    }
    return;
}