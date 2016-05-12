//other api data 
import Q = require('q');
import request = require('request');
import config = require('config');
import mongoose = require('mongoose');
import atmsmodels = require('../../models/atms/model');
var atmmodel = new atmsmodels.atm();

//Transform
var atmschema = atmmodel._schema;
atmschema.set('toJSON', {
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
        url: config.get<string>('atmsservice.url'),
        method: 'POST',
        //Lets post the following key/values as form
        json: a
    },
        function (error, response, body) {
            if (error) {
                deferred.resolve(error);
            } else {
                for (var a in body) {
                    body[a].atmCode = config.get<any>('atmsservice.atmcode')
                }
                deferred.resolve(body);
            }
        });
    return deferred.promise;
}

export function listBid(string: string) {
    var deferred = Q.defer();
    var theatm = mongoose.model('atm', atmschema);
    theatm.find(string)
        .populate('meta.license', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: atmsmodels.atmdef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}
export function listId(string: string) {
    var deferred = Q.defer();
    var theatm = mongoose.model('atm', atmschema);
    theatm.findOne(string)
        .populate('meta.license', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: atmsmodels.atmdef) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}
export function listMore(string: string) {
    var deferred = Q.defer();
    var theatm = mongoose.model('atm', atmschema);
    theatm.find(string)
        .populate('meta.license', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: atmsmodels.atmdef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function set(string: string, object: atmsmodels.atmdef) {
    function update() {
        insert.validate(function (err) {
            if (err) {
                deferred.resolve(err);
                return;
            }
            theatm.findByIdAndUpdate(insert._id, insert, { upsert: true, new: true },
                function (err2, found) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve(found)
                });
        });
    }
    var deferred = Q.defer();
    var insert = atmmodel.set(object);
    var theatm = mongoose.model('atm', atmmodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        theatm.findOne(string)
            .select('islocked').exec(function (err, found: atmsmodels.atmdef) {
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
    var theatm = mongoose.model('atm', atmmodel._schema);
    theatm.findOne(string)
        .select('islocked').exec(function (err, found: atmsmodels.atmdef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found) { deferred.resolve({ error: "Item not exists" }) }
            else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
            else {
                theatm.remove({ _id: found._id }, function (err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}