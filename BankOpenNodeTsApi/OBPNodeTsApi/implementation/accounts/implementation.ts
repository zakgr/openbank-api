//account implementation
import express = require('express');
import accountsservice = require('../../services/accounts/service');
import commonfunct = require('../../implementation/commonfunct');

export function listbid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    accountsservice.listBid(question).then(
        function (resp) { res.json({ accounts: resp }) }
    );
}; 
export function listid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    question._id = req.params.id;
    accountsservice.listId(question).then(
        function (resp) { res.json(resp) }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.name, "i") 
    if (req.body.label) { question.label = commonfunct.customcontainsregexp(req.body.label); }
    if (req.body.type_id) { question.type = req.body.type_id; }
    if (req.body.IBAN) { question.IBAN = req.body.IBAN; }
    if (req.params.id) { question._id = req.params.id; }
    if (req.params.bid) { question.bank_id = req.params.bid; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    }
    accountsservice.listMore(question).then(
        function (resp) { res.json({ accounts: resp }) }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var input = req.body;
    if (req.params.id) { question._id = req.params.id; }
    input.bank = req.params.bid;
    accountsservice.set(question, input).then(
        function (resp) { res.json(resp) }
    );
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.params.id) { question._id = req.params.id; }
    accountsservice.del(question).then(
        function (resp) { res.json(resp) }
    );
};