//customers implemantation
import express = require('express');
import customersservice = require('../../services/customers/service');

export function list(req: express.Request, res: express.Response, next) {
    customersservice.listAll().then(
        function (resp) {
            res.json(
                { customers: resp }
            )
        }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.body.payload.legal_name) { question.legal_name = new RegExp(req.body.payload.legal_name  , "i"); }
    if (req.body.payload.customer_number) { question._id = req.body.payload.customer_number; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    customersservice.listMore(question).then(
        function (resp) {
            res.json(
                { customers: resp }
            )
        }
    );
};

export function get(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.body.payload.legal_name) { question.legal_name = new RegExp(req.body.payload.legal_name  , "i"); }
    if (req.body.payload.customer_number) { question._id = req.body.payload.customer_number; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    customersservice.list(question).then(
        function (resp) { res.json(resp) }
    );
};

export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.body.payload.customer_number) { question._id = req.body.payload.customer_number; }
    if (!req.body.payload.insert) {
        res.json({ reqwas: req.body.payload, error: "No insert input" })
    }
    //if (JSON.stringify(question) === "{}") {
    //    res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    //}
    customersservice.set(question, req.body.payload.insert).then(
        function (resp) { res.json(resp) }
    );
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.customer_number) { question._id = req.body.payload.customer_number; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    customersservice.del(question).then(
        function (resp) { res.json(resp) }
    );
};