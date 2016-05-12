//other api data 
import Q = require('q');
import request = require('request');
import config = require('config');
import mongoose = require('mongoose');
import transactionsmodels = require('../../models/transactions/model');
var transactionmodel = new transactionsmodels.transaction();

//Transform
var accountschema = transactionmodel._schema;
accountschema.set('toJSON', {
    transform: function (doc, ret, options) {
        try { ret.this_account = ret.this_account.text; } catch (err) { }
        try { ret.other_account = ret.other_account.text; } catch (err) { }
        try { ret.this_account_insystem = ret.this_account_insystem.text; } catch (err) { }
        try { ret.other_account_insystem = ret.other_account_insystem.text; } catch (err) { }
        try { ret.metadata.narrative = ret.metadata.narrative.text; } catch (err) { }
        try { ret.metadata.comments = ret.metadata.comments.text; } catch (err) { }
        try { ret.metadata.tags = ret.metadata.tags.text; } catch (err) { }
        try { ret.metadata.where = ret.metadata.where.text; } catch (err) { }
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

export function listAll() {
    var deferred = Q.defer();
    var thetransaction = mongoose.model('transaction', accountschema);
    thetransaction.find({})
        .populate('this_account', 'text -_id') // only works if we pushed refs to children
        .populate('other_account', 'text -_id') // only works if we pushed refs to children
        .populate('this_account_insystem', 'text -_id') // only works if we pushed refs to children
        .populate('other_account_insystem', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.narrative', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.comments', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.tags', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.where', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: transactionsmodels.transactiondef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function listMore(string: string) {
    var deferred = Q.defer();
    var thetransaction = mongoose.model('transaction', accountschema);
    thetransaction.find(string)
        .populate('this_account', 'text -_id') // only works if we pushed refs to children
        .populate('other_account', 'text -_id') // only works if we pushed refs to children
        .populate('this_account_insystem', 'text -_id') // only works if we pushed refs to children
        .populate('other_account_insystem', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.narrative', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.comments', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.tags', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.where', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: transactionsmodels.transactiondef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}


export function list(string: string) {
    var deferred = Q.defer();
    var thetransaction = mongoose.model('transaction', accountschema);
    thetransaction.findOne(string)
        .populate('this_account', 'text -_id') // only works if we pushed refs to children
        .populate('other_account', 'text -_id') // only works if we pushed refs to children
        .populate('this_account_insystem', 'text -_id') // only works if we pushed refs to children
        .populate('other_account_insystem', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.narrative', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.comments', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.tags', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.where', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: transactionsmodels.transactiondef) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function set(string: string, object: transactionsmodels.transactiondef) {
    function update() {
        insert.validate(function (err) {
            if (err) {
                deferred.resolve(err);
                return;
            }
            thetransaction.findByIdAndUpdate(insert._id, insert, { upsert: true, new: true },
                function (err2, found) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve(found)
                });
        });
    }
    var deferred = Q.defer();
    var insert = transactionmodel.set(object);
    var thetransaction = mongoose.model('transaction', transactionmodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        thetransaction.findOne(string)
            .select('islocked').exec(function (err, found: transactionsmodels.transactiondef) {
                if (err) deferred.resolve({ error: err });
                else if (!found) { deferred.resolve({ error: "Item not exists" }) }
                // else if ( found.islocked) { deferred.resolve({ error: "This item is locked" }) }
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
    var thetransaction = mongoose.model('transaction', transactionmodel._schema);
    thetransaction.findOne(string)
        .select('islocked').exec(function (err, found: transactionsmodels.transactiondef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found) { deferred.resolve({ error: "Item not exists" }) }
            //  else if ( found.islocked) {deferred.resolve({ error: "This item is locked" })}
            else {
                thetransaction.remove({ _id: found._id }, function (err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}