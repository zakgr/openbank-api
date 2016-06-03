//other api data 
import Q = require('q');
import mongoose = require('mongoose');
import transactionsmodels = require('../models/transactions/model');
import accountsservice = require('../services/accounts/service');
import transactionsservice = require('../services/transactions/service');
import commonservice = require('../services/commonservice');
var transactionmodel = transactionsservice.transactionmodel;
/*
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
            //found = transform(found);
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
        .exec(function (err, found: transactionsmodels.transactiondef) {
            //found = transform(found);
            commonservice.answer(err, found, name, deferred);
        });
    return deferred.promise;
}
*/
export function set() {
    console.log('start draft');
    var string: any = { 'details.status': 'DRAFT' };
    //var object: transactionsmodels.transactiondef;
    //var insert = transactionmodel.set(object);
    var thetransaction = mongoose.model('transaction', transactionmodel._schema);
    thetransaction.find(string).lean()
        .populate('this_account', '_id') // only works if we pushed refs to children
        .exec(function (err, found: transactionsmodels.transactiondef[]) {
            found.forEach(function (transactiondraft) {
                var newBalance = { $inc: { 'balance.amount': transactiondraft['details'].value.amount } };
                var this_account = { _id: transactiondraft.this_account._id.toString(), $isolated: 1 };
                /*
                if (transactiondraft.transactionRequest) {
                    var other_account = { other_account_insystem: transactiondraft.other_account, $isolated: 1 };
                    var other_newBalance = { $inc: { 'balance.amount': -1 * transactiondraft['details'].value.amount } };
                    accountsservice.setid(this_account, newBalance).then(function (resp) {
                        transactiondraft.details.new_balance.currency = transactiondraft.details.value.currency;
                        transactiondraft.details.new_balance.amount = resp['data'].balance.amount;
                    });
                    accountsservice.setid(other_account, other_newBalance).then(function (resp) {

                    });
                }
                
                else*/
                if (transactiondraft.this_account) {
                    accountsservice.setid(this_account, newBalance).then(function (resp) {
                        if (resp['data']) {
                            transactiondraft.details.new_balance.currency = transactiondraft.details.value.currency;
                            transactiondraft.details.new_balance.amount = resp['data'].balance.amount;
                            transactiondraft.details.approved_by_ip_address = "68.180.194.242";
                            transactiondraft.details.approved_by_user_id = "e8c7ce8f-640b-4c5c-a222-08a77ba49d15";
                            transactiondraft.details.description = "Transaction OK";
                            transactiondraft.details.status = "COMPLETED";
                            transactionsservice.set(transactiondraft._id, transactiondraft);
                        }
                        else {
                            transactiondraft.details.cancelled_by_ip_address = "68.180.194.242";
                            transactiondraft.details.cancelled_by_user_id = "e8c7ce8f-640b-4c5c-a222-08a77ba49d15";
                            transactiondraft.details.description = "Account Problem";
                            transactiondraft.details.status = "CANCELLED";
                            transactionsservice.set(transactiondraft._id, transactiondraft);
                        }
                    });
                }
                else {
                    //error
                }
            });
        });
    console.log('end draft');
}