﻿// messages implementation
import express = require('express');
import messagesservice = require('../../services/messages/service');
import commonfunct = require('../../implementation/commonfunct');
var name = { messages: null };

export function listbid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    messagesservice.listBid(question).then(
        function (resp) {
            commonfunct.response(resp, name, res, next)
        }
    );
};
export function listid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    question._id = req.params.id;
    messagesservice.listId(question).then(
        function (resp) {
            commonfunct.response(resp, name, res, next)
        }
    );
};
export function listid2(req: express.Request, res: express.Response, next) {
    var check = { field: ['customer_id'], params: [req, res, next] };
    if (commonfunct.check(check)) {
        var question: any = {};
        question.bank_id = req.params.bid;
        question.customer_id = commonfunct.bankpermissions(req).customer_id;
        messagesservice.listBid(question).then(
            function (resp) {
                commonfunct.response(resp, name, res, next)
            }
        );
    }
};
export function listmore(req: express.Request, res: express.Response, next) {
    var check = { field: ['data'], params: [req, res, next] };
    if (commonfunct.check(check)) {
        var question: any = {};
        if (req.body.city) { question.city = commonfunct.customcontainsregexp(req.body.city); }
        if (req.body.name) { question.name = commonfunct.customcontainsregexp(req.body.name); }
        if (req.params.id) { question._id = req.params.id; }
        if (req.params.bid) { question.bank_id = req.params.bid; }
        messagesservice.listMore(question).then(
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
    input.bank_id = req.params.bid;
    input.customer_id = req.params.cid;
    messagesservice.set(question, input).then(
        function (resp) {
            commonfunct.response(resp, name, res, next)
        }
    );
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.params.id) { question._id = req.params.id; }
    messagesservice.del(question).then(
        function (resp) {
            commonfunct.response(resp, name, res, next)
        }
    );
};