// transactionRequests implementation
import express = require('express');
import transactionRequestsservice = require('../../services/transactionRequests/service');
import commonfunct = require('../../implementation/commonfunct');
import accountsservice = require('../../services/accounts/service');
import Q = require('q');
var name = { 'transaction-requests': null };

export function list(req: express.Request, res: express.Response, next) {
    transactionRequestsservice.listAll().then(
        function (resp) {
            commonfunct.response(resp, name, res, next)
        }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var check = { field: ['data'], params: [req, res, next] };
    if (commonfunct.check(check)) {
        var question: any = {};
        if (req.body.this_account) { question.this_account = req.body.this_account; }
        if (req.body.other_account) { question.other_account = req.body.other_account; }
        if (req.body.this_account_insystem) { question.this_account_insystem = req.body.this_account_insystem; }
        if (req.body.other_account_insystem) { question.other_account_insystem = req.body.other_account_insystem; }
        if (req.body.details.date) {
            question.details = {};
            question.details.posted = new RegExp(req.body.details.date, "i");
        }
        if (req.body.uuid) { question.uuid = req.body.uuid; }
        if (req.params.id) { question._id = req.params.id; }
        transactionRequestsservice.listMore(question).then(
            function (resp) {
                commonfunct.response(resp, name, res, next)
            }
        );
    }
};
export function set(req: express.Request, res: express.Response, next) {
    function transactionRequest() {
        if (fromaccount && toacccount) {
            input.details.posted = new Date().toISOString();
            transactionRequestsservice.set(question, input).then(
                function (resp) {
                    commonfunct.response(resp, name, res, next)
                });
        }
    }
    var question: any = {};
    var input = req.body;
    var fromaccount: boolean, toacccount: boolean;
    input.details = {};
    input.details.posted_by_user_id = req.user.id.toString();
    input.details.posted_by_ip_address = req.ip;
    input.details.type = req.params.type;
    input.details.description = input.description;
    input.details.value = input.value;
    delete input.description;
    delete input.value;

    if (req.params.id) { question._id = req.params.id; }
    if (input.from.other_account_id) {
        input.this_account = input.from.other_account_id;
        fromaccount = true;
    }
    else if (input.from.account_id && input.from.bank_id) {
        question.from = {};
        question.from._id = input.from.account_id;
        question.from.bank_id = input.from.bank_id;
        accountsservice.listId(question.from).then(function (resp) {
            if (resp['data']) {
                fromaccount = true;
                input.this_account_insystem = input.from.account_id;
                delete question.from;
                Q.nextTick(transactionRequest);
            }
            else commonfunct.response(resp, name, res, next)
        });
    }
    if (input.to.other_account_id) {
        input.other_account = input.to.other_account_id;
        toacccount = true;
    }
    else if (input.to.account_id && input.to.bank_id) {
        question.to = {};
        question.to._id = input.to.account_id;
        question.to.bank_id = input.to.bank_id;
        question.to.balance = { type: { currency: input.value.currency } };
        accountsservice.listId(question.to).then(function (resp) {
            if (resp['data']) {
                if (input.value.currency == resp['data'].balance.type.currency) {
                    toacccount = true;
                    input.other_account_insystem = input.to.account_id;
                    delete question.to;
                    Q.nextTick(transactionRequest);
                }
                else {
                    delete resp['data'];
                    resp = { error: 'Currency Not Same', status: 400 };
                    commonfunct.response(resp, name, res, next)
                }
            }
            else commonfunct.response(resp, name, res, next)
        });
    }
    Q.nextTick(transactionRequest);
};