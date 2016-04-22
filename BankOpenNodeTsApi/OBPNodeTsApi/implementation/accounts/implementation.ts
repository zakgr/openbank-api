//account implementation
import express = require('express');
import accountsservice = require('../../services/accounts/service');

export function list(req: express.Request, res: express.Response, next) {
    accountsservice.listAll().then(
        function (resp) {
            res.json(
                { accounts: resp }
            )
        }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.label) { question.label = new RegExp(req.body.payload.label, "i"); }
    if (req.body.payload.type_id) { question.type = req.body.payload.type_id; }
    if (req.body.payload.IBAN) { question.IBAN = req.body.payload.IBAN; }
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    accountsservice.listMore(question).then(
        function (resp) {
            res.json(
                { accounts: resp }
            )
        }
    );
};
export function get(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.label) { question.label = new RegExp(req.body.payload.label, "i"); }
    if (req.body.payload.type_id) { question.type = req.body.payload.type_id; }
    if (req.body.payload.IBAN) { question.IBAN = req.body.payload.IBAN; }
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    accountsservice.list(question).then(
        function (resp) { res.json(resp) }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (!req.body.payload.insert) {
        res.json({ reqwas: req.body.payload, error: "No insert input" })
    }
    //if (JSON.stringify(question) === "{}") {
    //    res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    //}
    accountsservice.set(question, req.body.payload.insert).then(
        function (resp) { res.json(resp) }
    );
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    accountsservice.del(question).then(
        function (resp) { res.json(resp) }
    );
};