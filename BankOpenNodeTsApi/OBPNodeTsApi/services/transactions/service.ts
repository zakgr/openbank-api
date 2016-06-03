//other api data 
import Q = require('q');
import mongoose = require('mongoose');
import transactionsmodels = require('../../models/transactions/model');
import commonservice = require('../../services/commonservice');
export var transactionmodel = new transactionsmodels.transaction();
var name = 'Transaction';
//Transform
export function transform(schema) {
    function change(ret) {
        //try { ret.this_account = ret.this_account.text; } catch (err) { }
        //try { ret.other_account = ret.other_account.text; } catch (err) { }
        try {
            ret.other_account = ret.other_account_insystem;
            delete ret.other_account_insystem;
        } catch (err) { }
        try { ret.metadata.narrative = ret.metadata.narrative.text; } catch (err) { }
        try { ret.metadata.comments = ret.metadata.comments.text; } catch (err) { }
        try { ret.metadata.tags = ret.metadata.tags.text; } catch (err) { }
        try { ret.metadata.where = ret.metadata.where.text; } catch (err) { }
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
    }
    if (schema) {
        if (schema.constructor === Object) { change(schema); }
        else { schema.map(function (ret) { change(ret); }); }
    }
    return schema;
};

export function listAll() {
    var deferred = Q.defer();
    var thetransaction = mongoose.model('transaction', transactionmodel._schema);
    thetransaction.find({}).lean()
        .populate('this_account', '-_id') // only works if we pushed refs to children
        .populate('other_account', '-_id') // only works if we pushed refs to children
        .populate('other_account_insystem', '-_id') // only works if we pushed refs to children
        .populate('metadata.narrative', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.comments', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.tags', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.where', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: transactionsmodels.transactiondef[]) {
            found = transform(found);
            commonservice.answer(err, found, name, deferred);
        });
    return deferred.promise;
}

export function listMore(string: string) {
    var deferred = Q.defer();
    var thetransaction = mongoose.model('transaction', transactionmodel._schema);
    thetransaction.find(string).lean()
        .populate('this_account', 'text -_id') // only works if we pushed refs to children
        .populate('other_account', 'text -_id') // only works if we pushed refs to children
        .populate('this_account_insystem', 'text -_id') // only works if we pushed refs to children
        .populate('other_account_insystem', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.narrative', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.comments', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.tags', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.where', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: transactionsmodels.transactiondef[]) {
            found = transform(found);
            commonservice.answer(err, found, name, deferred);
        });
    return deferred.promise;
}


export function list(string: string) {
    var deferred = Q.defer();
    var thetransaction = mongoose.model('transaction', transactionmodel._schema);
    thetransaction.findOne(string).lean()
        .populate('this_account', 'text -_id') // only works if we pushed refs to children
        .populate('other_account', 'text -_id') // only works if we pushed refs to children
        .populate('this_account_insystem', 'text -_id') // only works if we pushed refs to children
        .populate('other_account_insystem', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.narrative', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.comments', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.tags', 'text -_id') // only works if we pushed refs to children
        .populate('metadata.where', 'text -_id') // only works if we pushed refs to children
        .exec(function (err, found: transactionsmodels.transactiondef) {
            found = transform(found);
            commonservice.answer(err, found, name, deferred);
        });
    return deferred.promise;
}

export function set(string: string, object: transactionsmodels.transactiondef) {
    var deferred = Q.defer();
    var insert = transactionmodel.set(object);
    var thetransaction = mongoose.model('transaction', transactionmodel._schema);
    //if (JSON.stringify(string) === "{}") {
    commonservice.update(insert, thetransaction, deferred);
    //}
    /*
    else {
        thetransaction.findOne(string)
            .exec(function (err, found: transactionsmodels.transactiondef) {
                if (err) deferred.resolve({ error: err, status: 500 });
                else if (!found) { deferred.resolve({ error: "Item not exists", status: 409 }) }
                else {
                    if (found && found._id) { insert._id = found._id; }
                    commonservice.update(insert, thetransaction, deferred);
                }
            });
    }
    */
    return deferred.promise;
}

export function del(string: string) {
    var deferred = Q.defer();
    var thetransaction = mongoose.model('transaction', transactionmodel._schema);
    thetransaction.findOneAndRemove(string)
        .exec(function (err, found: transactionsmodels.transactiondef) {
            if (err) { deferred.resolve({ error: err, status: 500 }) }
            else if (!found) { deferred.resolve({ error: "Item not exists", status: 409 }) }
            else { deferred.resolve({ data: { "ok": 1 }, status: 200 }) }
        });
    return deferred.promise;
}