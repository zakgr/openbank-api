// atms implementation
import express = require('express');
import atmsservice = require('../../services/atms/service');
import commonfunct = require('../../implementation/commonfunct');

export function listbid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    atmsservice.listBid(question).then(
        function (resp) { res.json({ atms: resp }) }
    );
};
export function listid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    question._id = req.params.id;
    atmsservice.listId(question).then(
        function (resp) { res.json(resp) }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example commonfunct.customcontainsregexp(req.body.name) 
    if (req.body.city) { question.city = commonfunct.customcontainsregexp(req.body.city); }
    if (req.body.name) { question.name = commonfunct.customcontainsregexp(req.body.name); }
    if (req.params.id) { question._id = req.params.id; }
    if (req.params.bid) { question.bank_id = req.params.bid; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    }
    atmsservice.listMore(question).then(
        function (resp) { res.json({ atms: resp }) }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var input = req.body;
    if (req.params.id) { question._id = req.params.id; }
    input.bank_id = req.params.bid;
    if (commonfunct.bankpermissions(req).can_edit_atms) {
        atmsservice.set(question, input).then(
            function (resp) { res.json({ atms: resp }) }
        );
    }
    else {
        res.json({ reqwas: req.body, error: "User has no can_edit_atms" })
    }
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.params.id) { question._id = req.params.id; }
    if (commonfunct.bankpermissions(req).can_edit_atms) {
        atmsservice.del(question).then(
            function (resp) { res.json({ atms: resp }) }
        );
    }
    else {
        res.json({ reqwas: req.body, error: "User has no can_edit_atms" })
    }
};