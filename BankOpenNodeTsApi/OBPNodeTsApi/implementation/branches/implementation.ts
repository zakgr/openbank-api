// branches implementation
import express = require('express');
import branchesservice = require('../../services/branches/service');
import commonfunct = require('../../implementation/commonfunct');

export function listbid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    branchesservice.listBid(question).then(
        function (resp) { res.json({ branches: resp }) }
    );
};
export function listid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    question._id = req.params.id;
    branchesservice.listId(question).then(
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
    branchesservice.listMore(question).then(
        function (resp) { res.json({ branches: resp }) }
    );

};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var input = req.body;
    if (req.params.id) { question._id = req.params.id; }
    input.bank = req.params.bid;
    if (commonfunct.bankpermissions(req).can_edit_branches) {
        branchesservice.set(question, input).then(
            function (resp) { res.json({ branches: resp }) }
        );
    }
    else {
        res.json({ reqwas: req.body, error: "User has no can_edit_branches" })
    }
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.params.id) { question._id = req.params.id; }
    if (commonfunct.bankpermissions(req).can_edit_branches) {
        branchesservice.del(question).then(
            function (resp) { res.json({ branches: resp }) }
        );
    }
    else {
        res.json({ reqwas: req.body, error: "User has no can_edit_branches" })
    }
};