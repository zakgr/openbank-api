// otherAccounts implementation
import express = require('express');
import otherAccountsservice = require('../../services/otherAccounts/service');
import commonfunct = require('../../implementation/commonfunct');

export function listbid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    otherAccountsservice.listBid(question).then(
        function (resp) { res.json({ otherAccounts: resp }) }
    );
};
export function listid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid; 
    question._id = req.params.id;
    otherAccountsservice.listId(question).then(
        function (resp) { res.json(resp) }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.name, "i")
    if (req.body.kind) { question.kind = commonfunct.customcontainsregexp(req.body.kind); }
    if (req.body.IBAN) { question.IBAN = req.body.IBAN; }
    if (req.params.id) { question._id = req.params.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    }
    otherAccountsservice.listMore(question).then(
        function (resp) { res.json({ otherAccounts: resp }) }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var input = req.body;
    if (req.params.id) { question._id = req.params.id; }
    input.bank = req.params.bid; 
    otherAccountsservice.set(question, input).then(
        function (resp) { res.json(resp) });
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.name, "i") 
    if (req.params.id) { question._id = req.params.id; }
    otherAccountsservice.del(question).then(
        function (resp) { res.json(resp) });
};