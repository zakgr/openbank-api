// otherAccounts implementation
import express = require('express');
import otherAccountsservice = require('../../services/otherAccounts/service');

export function list(req: express.Request, res: express.Response, next) {
    otherAccountsservice.listAll().then(
        function(resp) {
            res.json(
                { otherAccounts: resp }
            )
        }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i")
    if (req.body.payload.kind) { question.kind = new RegExp(req.body.payload.kind, "i"); }
    if (req.body.payload.IBAN) { question.IBAN = req.body.payload.IBAN; } 
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    otherAccountsservice.listMore(question).then(
        function(resp) {
            res.json(
                { otherAccounts: resp }
            )
        }
    );
};
export function get(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i")
    if (req.body.payload.kind) { question.kind = new RegExp(req.body.payload.kind, "i"); }
    if (req.body.payload.IBAN) { question.IBAN = req.body.payload.IBAN; } 
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    otherAccountsservice.list(question).then(
        function(resp) { res.json(resp) });
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};

    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (!req.body.payload.insert) {
        res.json({ reqwas: req.body.payload, error: "No insert input" })
    }
    //if (JSON.stringify(question) === "{}") {
    //    res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    //}
    otherAccountsservice.set(question, req.body.payload.insert).then(
        function(resp) { res.json(resp) });
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    otherAccountsservice.del(question).then(
        function(resp) { res.json(resp) });
};