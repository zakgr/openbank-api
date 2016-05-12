//mongo data 
import Q = require('q');
import mongoose = require('mongoose');
import usersmodels = require('../../models/users/model');
var usermodel = new usersmodels.user();

//Transform
var userschema = usermodel._schema;
userschema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

export function listAll() {
    var deferred = Q.defer();
    var theuser = mongoose.model('user', userschema);
    theuser.find({}, function (err, found: usersmodels.userdef[]) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function listId(string: string) {
    var deferred = Q.defer();
    var theuser = mongoose.model('user', userschema);
    theuser.findOne(string, function (err, found: usersmodels.userdef) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function listMore(string: string) {
    var deferred = Q.defer();
    var theuser = mongoose.model('user', userschema);
    theuser.findOne({ providers: { $elemMatch: string } }, function (err, found: usersmodels.userdef[]) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function set(string: string, object: usersmodels.userdef) {
    function update() {
        insert.validate(function (err) {
            if (err) {
                deferred.resolve(err);
                return;
            }
            theuser.findByIdAndUpdate(insert._id, insert, { upsert: true, new: true },
                function (err2, found) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve(found)
                });
        });
    }
    var deferred = Q.defer();
    var insert = usermodel.set(object);
    var theuser = mongoose.model('user', usermodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        theuser.findOne(string)
            .select('islocked').exec(function (err, found: usersmodels.userdef) {
                if (err) deferred.resolve({ error: err })
                else if (!found) { deferred.resolve({ error: "Item not exists" }) }
              //  else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
                else {
                    if (found && found._id) { insert._id = found._id; }
                    update();
                }
            });
    }
    return deferred.promise;
}

export function del(string: string) {
    var deferred = Q.defer();
    var theuser = mongoose.model('user', usermodel._schema);
    theuser.findOne(string)
        .select('islocked').exec(function (err, found: usersmodels.userdef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found) { deferred.resolve({ error: "Item not exists" }) }
         //   else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
            else {
                theuser.remove({ _id: found._id }, function (err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}