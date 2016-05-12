//mongo data 
import Q = require('q');
import mongoose = require('mongoose');
import accountsmodels = require('../../models/accounts/model');
var accountmodel = new accountsmodels.account();

//Transform
var accountschema = accountmodel._schema;
accountschema.set('toJSON', {
    transform: function (doc, ret, options) {
        //     try { ret.bank_id = ret.bank_id.text; } catch (err) { }
        try { ret.type = ret.type.name; } catch (err) { }
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
export function listBid(string: string) {
    var deferred = Q.defer();
    var theaccount = mongoose.model('account', accountschema);
    theaccount.find(string)
        .populate('type', 'name -_id') // only works if we pushed refs to children
        .exec(function (err, found: accountsmodels.accountdef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}
export function listId(string: string) {
    var deferred = Q.defer();
    var theaccount = mongoose.model('account', accountschema);
    theaccount.findOne(string)
        .populate('type', 'name -_id') // only works if we pushed refs to children
        .exec(function (err, found: accountsmodels.accountdef) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}
export function listMore(string: string) {
    var deferred = Q.defer();
    //Transform
    var theaccount = mongoose.model('account', accountschema);
    theaccount.find(string)
        //  .populate('bank_id', 'text -_id') // only works if we pushed refs to children
        .populate('type', 'name -_id') // only works if we pushed refs to children
        .exec(function (err, found: accountsmodels.accountdef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function set(string: string, object: accountsmodels.accountdef) {
    function update() {
        insert.validate(function (err) {
            if (err) {
                deferred.resolve(err);
                return;
            }
            theaccount.findByIdAndUpdate(insert._id, insert, { upsert: true, new: true },
                function (err2, found) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve(found)
                });
        });
    }
    var deferred = Q.defer();
    var insert = accountmodel.set(object);
    var theaccount = mongoose.model('account', accountmodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        theaccount.findOne(string)
            .select('islocked').exec(function (err, found: accountsmodels.accountdef) {
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
    var theaccount = mongoose.model('account', accountmodel._schema);
    theaccount.findOne(string)
        .select('islocked').exec(function (err, found: accountsmodels.accountdef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found) { deferred.resolve({ error: "Item not exists" }) }
            else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
            else {
                theaccount.remove({ _id: found._id }, function (err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}