//other api data 
import Q = require('q');
import request = require('request');
import config = require('config');
import mongoose = require('mongoose');
import branchesmodels = require('../../models/branches/model');
var branchemodel = new branchesmodels.branche();

//Transform
var brancheschema = branchemodel._schema;
brancheschema.set('toJSON', {
    transform: function (doc, ret, options) {
        try { ret.meta.license = ret.meta.license.text; } catch (err) { }
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
//connect to legacy public services example
export function listAll2(a: any) {
    var deferred = Q.defer();
    request({
        url: config.get<string>('branchesservice.url'),
        method: 'POST',
        //Lets post the following key/values as form
        json: a
    },
        function (error, response, body) {
            if (error) {
                deferred.resolve(error);
            } else {
                for (var a in body) {
                    body[a].brancheCode = config.get<any>('branchesservice.branchecode')
                }
                deferred.resolve(body);
            }
        });
    return deferred.promise;
}
export function listBid(string: string) {
    var deferred = Q.defer();
    var thebranche = mongoose.model('branche', brancheschema);
    thebranche.find(string)
        .populate('meta.license', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: branchesmodels.branchedef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}
export function listId(string: string) {
    var deferred = Q.defer();
    var thebranche = mongoose.model('branche', brancheschema);
    thebranche.findOne(string)
        .populate('meta.license', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: branchesmodels.branchedef) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function listMore(string: string) {
    var deferred = Q.defer();
    var thebranche = mongoose.model('branche', brancheschema);
    thebranche.find(string)
        .populate('meta.license', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: branchesmodels.branchedef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function set(string: string, object: branchesmodels.branchedef) {
    function update() {
        insert.validate(function (err) {
            if (err) {
                deferred.resolve(err);
                return;
            }
            thebranche.findByIdAndUpdate(insert._id, insert, { upsert: true, new: true },
                function (err2, found) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve(found)
                });
        });
    }
    var deferred = Q.defer();
    var insert = branchemodel.set(object);
    var thebranche = mongoose.model('branche', branchemodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        thebranche.findOne(string)
            .select('islocked').exec(function (err, found: branchesmodels.branchedef) {
                if (err) deferred.resolve({ error: err })
                else if (!found) { deferred.resolve({ error: "Item not exists" }) }
                else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
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
    var thebranche = mongoose.model('branche', branchemodel._schema);
    thebranche.findOne(string)
        .select('islocked').exec(function (err, found: branchesmodels.branchedef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found) { deferred.resolve({ error: "Item not exists" }) }
            else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
            else {
                thebranche.remove({ _id: found._id }, function (err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}