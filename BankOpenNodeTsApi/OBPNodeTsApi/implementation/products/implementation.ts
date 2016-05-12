//product implementation
import express = require('express');
import productsservice = require('../../services/products/service');
import commonfunct = require('../../implementation/commonfunct');

export function listbid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    productsservice.listBid(question).then(
        function (resp) { res.json({ products: resp }) }
    );
};
export function listid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    question._id = req.params.id;
    productsservice.listId(question).then(
        function (resp) { res.json(resp) }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example commonfunct.customcontainsregexp(req.body.name) 
    if (req.body.name) { question.name = commonfunct.customcontainsregexp(req.body.name); }
    if (req.body.family) { question.family = commonfunct.customcontainsregexp(req.body.family); }
    if (req.params.id) { question._id = req.params.id; }
    if (req.params.bid) { question.bank_id = req.params.bid; }
    if (req.body.category) { question.category = req.body.category; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    }
    productsservice.listMore(question).then(
        function (resp) { res.json({ products: resp }) }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var input = req.body;
    if (req.params.id) { question._id = req.params.id; }
    input.bank = req.params.bid;
    if (commonfunct.bankpermissions(req).can_edit_customers) {
        productsservice.set(question, input).then(
            function (resp) { res.json({ products: resp }) }
        );
    }
    else {
        res.json({ reqwas: req.body, error: "User has no can_edit_products" })
    }
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.params.id) { question._id = req.params.id; }
    if (commonfunct.bankpermissions(req).can_edit_customers) {
        productsservice.del(question).then(
            function (resp) { res.json({ products: resp }) }
        );
    }
    else {
        res.json({ reqwas: req.body, error: "User has no can_edit_products" })
    }
};