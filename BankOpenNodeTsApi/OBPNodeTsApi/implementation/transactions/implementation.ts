// transactions implementation
import express = require('express');
import transactionsservice = require('../../services/transactions/service');
import commonfunct = require('../../implementation/commonfunct');
var name = { transactions: null };

export function list(req: express.Request, res: express.Response, next) {
    transactionsservice.listAll().then(
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
        transactionsservice.listMore(question).then(
            function (resp) {
                commonfunct.response(resp, name, res, next)
            }
        );
    }
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var input = req.body;
    if (req.params.id) { question._id = req.params.id; }
    transactionsservice.set(question, input).then(
        function (resp) {
            commonfunct.response(resp, name, res, next)
        });
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.name, "i") 
    if (req.params.id) { question._id = req.params.id; }
    transactionsservice.del(question).then(
        function (resp) {
            commonfunct.response(resp, name, res, next)
        });
};