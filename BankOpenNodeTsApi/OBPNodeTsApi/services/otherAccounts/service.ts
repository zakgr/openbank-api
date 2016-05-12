//other api data 
import Q = require('q');
import request = require('request');
import config = require('config');
import mongoose = require('mongoose');
import otherAccountsmodels = require('../../models/otherAccounts/model');
var otherAccountmodel = new otherAccountsmodels.otherAccount();

//Transform
var accountschema = otherAccountmodel._schema;
accountschema.set('toJSON', {
    transform: function (doc, ret, options) {
        try { ret.bank = { national_identifier: ret.bank.short_name, name: ret.bank.full_name }; } catch (err) { }
        try { ret.metadata.public_alias = ret.metadata.public_alias.text; } catch (err) { }
        try { ret.metadata.private_alias = ret.metadata.private_alias.text; } catch (err) { }
        try { ret.metadata.more_info = ret.metadata.more_info.text; } catch (err) { }
        try { ret.metadata.URL = ret.metadata.URL.text; } catch (err) { }
        try { ret.metadata.image_URL = ret.metadata.image_URL.text; } catch (err) { }
        try { ret.metadata.open_corporates_URL = ret.metadata.open_corporates_URL.text; } catch (err) { }
        try { ret.metadata.corporate_location = ret.metadata.corporate_location.text; } catch (err) { }
        try { ret.metadata.physical_location = ret.metadata.physical_location.text; } catch (err) { }
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

export function listBid(string: string) {
    var deferred = Q.defer();
    var theotherAccount = mongoose.model('otherAccount', accountschema);
    theotherAccount.find(string)
        .populate('bank', 'short_name full_name -_id') // only works if we pushed refs to children
        .populate('metadata.public_alias', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.private_alias', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.more_info', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.image_URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.open_corporates_URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.corporate_location', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.physical_location', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: otherAccountsmodels.otherAccountdef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}
export function listId(string: string) {
    var deferred = Q.defer();
    var theotherAccount = mongoose.model('otherAccount', accountschema);
    theotherAccount.findOne(string)
        .populate('bank', 'short_name full_name -_id') // only works if we pushed refs to children
        .populate('metadata.public_alias', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.private_alias', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.more_info', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.image_URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.open_corporates_URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.corporate_location', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.physical_location', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: otherAccountsmodels.otherAccountdef) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function listMore(string: string) {
    var deferred = Q.defer();
    var theotherAccount = mongoose.model('otherAccount', accountschema);
    theotherAccount.find(string)
        .populate('bank', 'short_name full_name -_id') // only works if we pushed refs to children
        .populate('metadata.public_alias', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.private_alias', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.more_info', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.image_URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.open_corporates_URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.corporate_location', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.physical_location', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: otherAccountsmodels.otherAccountdef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function list(string: string) {
    var deferred = Q.defer();
    var theotherAccount = mongoose.model('otherAccount', accountschema);
    theotherAccount.findOne(string)
        .populate('bank', 'short_name full_name -_id') // only works if we pushed refs to children
        .populate('metadata.public_alias', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.private_alias', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.more_info', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.image_URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.open_corporates_URL', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.corporate_location', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.physical_location', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: otherAccountsmodels.otherAccountdef) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function set(string: string, object: otherAccountsmodels.otherAccountdef) {
    function update() {
        insert.validate(function (err) {
            if (err) {
                deferred.resolve(err);
                return;
            }
            theotherAccount.findByIdAndUpdate(insert._id, insert, { upsert: true, new: true },
                function (err2, found) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve(found)
                });
        });
    }
    var deferred = Q.defer();
    var insert = otherAccountmodel.set(object);
    var theotherAccount = mongoose.model('otherAccount', otherAccountmodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        theotherAccount.findOne(string)
            .select('islocked').exec(function (err, found: otherAccountsmodels.otherAccountdef) {
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
    var theotherAccount = mongoose.model('otherAccount', otherAccountmodel._schema);
    theotherAccount.findOne(string)
        .select('islocked').exec(function (err, found: otherAccountsmodels.otherAccountdef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found) { deferred.resolve({ error: "Item not exists" }) }
            else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
            else {
                theotherAccount.remove({ _id: found._id }, function (err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}