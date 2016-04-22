//connector 
import Q = require('q');
import mongoose = require('mongoose');
import usersmodels = require('../../models/users/model');
var usermodel = new usersmodels.user();

export function listAll() {
    var deferred = Q.defer();
    var theuser = mongoose.model('user', usermodel._schema);
    theuser.find({}, function (err, found: usersmodels.userdef[]) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function list(string: string) {
    var deferred = Q.defer();
    var theuser = mongoose.model('user', usermodel._schema);
    theuser.findOne(string, function (err, found: usersmodels.userdef) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function set(string: string, object: usersmodels.userdef) {
    var deferred = Q.defer();
    var insert = usermodel.set(
        object.userId,
        object.userName,
        object.name,
        object.authCode,
        object.userIp);
    var theuser = mongoose.model('user', usermodel._schema);
    theuser.findOne(string, function (err, found: usersmodels.userdef) {
        if (err) deferred.resolve({ error: err });
        if (found && found._id) { insert._id = found._id; }
        console.log('infind2');
        theuser.update({ _id: insert._id }, insert, { upsert: true, setDefaultsOnInsert: true },
            function (err2) {
                if (err2) deferred.resolve({ error: err2 });
                deferred.resolve(insert._id);
            });
    });

    return deferred.promise;
}

export function del(string: string) {
    var deferred = Q.defer();
    var theuser = mongoose.model('user', usermodel._schema);
    theuser.findOne(string, function (err, found: usersmodels.userdef) {
        if (err) deferred.resolve({ error: err });
        theuser.remove({ _id: found._id }, function (err2) {
            if (err2) deferred.resolve({ error: err2 });
            deferred.resolve('ok')
        });
    });

    return deferred.promise;
}