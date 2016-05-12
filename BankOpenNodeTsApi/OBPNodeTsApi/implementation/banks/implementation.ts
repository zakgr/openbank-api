//bank implementation
import express = require('express');
import banksservice = require('../../services/banks/service');
import commonfunct = require('../../implementation/commonfunct');

export function list(req: express.Request, res: express.Response, next) {
    banksservice.listAll().then(
        function (resp) { res.json({ banks: resp }) }
    );
};
export function listid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.params.id) { question._id = req.params.id; }
    banksservice.listId(question).then(
        function (resp) { res.json(resp) }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.body.short_name) { question.short_name = commonfunct.customcontainsregexp(req.body.short_name); }
    if (req.body.full_name) { question.full_name = commonfunct.customcontainsregexp(req.body.full_name); }
    if (req.body.id) { question._id = req.body.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    }
    banksservice.listMore(question).then(
        function (resp) { res.json({ banks: resp }) }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var input = req.body;
    if (req.params.id) { question._id = req.params.id; }
    if ((req.user.can_add_bank && !question._id ) ||
        req.user.can_edit_banks    ) {
        banksservice.set(question, input).then(
            function (resp) { res.json({ banks: resp }) }
        );
    }
    else {
        res.json({ reqwas: req.body, error: "User has no can_add_bank,can_edit_banks" })
    }
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.params.id) { question._id = req.params.id; }
    if (req.user.can_edit_banks) {
        banksservice.del(question).then(
            function (resp) { res.json(resp) }
        );
    }
    else {
        res.json({ reqwas: req.body, error: "User has no can_add_bank" })
    }
};