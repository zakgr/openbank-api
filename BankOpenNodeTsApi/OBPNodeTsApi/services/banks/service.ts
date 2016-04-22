//mongo data 
import Q = require('q');
import mongoose = require('mongoose');
import banksmodels = require('../../models/banks/model');
var bankmodel = new banksmodels.bank();

//Transform
export function convertschema() {
    var tempschema = bankmodel._schema;
    tempschema.set('toJSON', {
        transform: function(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });
    return tempschema;
}

export function listAll() {
    var deferred = Q.defer();
    var bankschema = convertschema();
    var thebank = mongoose.model('bank', bankschema);
    thebank.find({}, function(err, found: banksmodels.bankdef[]) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function listMore(string: string) {
    var deferred = Q.defer();
    var bankschema = convertschema();
    var thebank = mongoose.model('bank', bankschema);
    thebank.find(string, function(err, found: banksmodels.bankdef[]) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function list(string: string) {
    var deferred = Q.defer();
    var bankschema = convertschema();
    var thebank = mongoose.model('bank', bankschema);
    thebank.findOne(string, function(err, found: banksmodels.bankdef) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function set(string: string, object: banksmodels.bankdef) {
    function update() {
        thebank.update({ _id: insert._id }, insert, { upsert: true, setDefaultsOnInsert: true },
            function(err2, found) {
                if (err2) deferred.resolve({ error: err2 });
                deferred.resolve(found)
            });
    }
    var deferred = Q.defer();
    var insert = bankmodel.set(object);
    var thebank = mongoose.model('bank', bankmodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        thebank.findOne(string)
            .select('islocked').exec(function(err, found: banksmodels.bankdef) {
                if (err) deferred.resolve({ error: err })
            else if (!found){deferred.resolve({ error: "Item not exists" })}
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
    var thebank = mongoose.model('bank', bankmodel._schema);
    thebank.findOne(string)
        .select('islocked').exec(function(err, found: banksmodels.bankdef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found){deferred.resolve({ error: "Item not exists" })}
            else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
            else {
                thebank.remove({ _id: found._id }, function(err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}