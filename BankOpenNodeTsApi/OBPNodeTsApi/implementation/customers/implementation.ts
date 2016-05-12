//customers implemantation
import express = require('express');
import customersservice = require('../../services/customers/service');
import commonfunct = require('../../implementation/commonfunct');

export function listbid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    if (!commonfunct.bankpermissions(req))
    { 
        res.json({ reqwas: req.body, error: "User has no relation with this bank" })
    }
    else if (!commonfunct.bankpermissions(req).can_edit_customers) {
        res.json({ reqwas: req.body, error: "User has no can_edit_customers" })
    }
    else {
        customersservice.listBid(question).then(
            function (resp) { res.json({ customers: resp }) }
        );
    }
};
export function listid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    question._id = req.params.id;
    if (!commonfunct.bankpermissions(req))
    { 
        res.json({ reqwas: req.body, error: "User has no relation with this bank" })
    }
    else if (!commonfunct.bankpermissions(req).can_edit_customers) {
        res.json({ reqwas: req.body, error: "User has no can_edit_customers" })
    }
    else {
        customersservice.listId(question).then(
            function (resp) { res.json(resp) }
        );
    }
};
export function listid2(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    var bank;
    if (!commonfunct.bankpermissions(req))
    { 
        res.json({ reqwas: req.body, error: "User has no relation with this bank" })
    }        
    else if (!commonfunct.bankpermissions(req).customer_id) {
        res.json({ reqwas: req.body, error: "User has no customer_id" })
    }
    else {
        question._id = commonfunct.bankpermissions(req).customer_id;
        customersservice.listId(question).then(
            function (resp) { res.json(resp) }
        );
    }
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.body.legal_name) { question.legal_name = commonfunct.customcontainsregexp(req.body.legal_name); }
    if (req.params.id) { question._id = req.params.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    }
    if (!commonfunct.bankpermissions(req))
    { 
        res.json({ reqwas: req.body, error: "User has no relation with this bank" })
    }
    else if (!commonfunct.bankpermissions(req).can_edit_customers) {
        res.json({ reqwas: req.body, error: "User has no can_edit_customers" })
    }
    else {
        customersservice.listMore(question).then(
            function (resp) { res.json({ customers: resp }) }
        );
    }
};

export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var input = req.body;
    if (req.params.id) { question._id = req.params.id; }
    input.bank_id = req.params.bid;
    if (!commonfunct.bankpermissions(req))
    { 
        res.json({ reqwas: req.body, error: "User has no relation with this bank" })
    }
    else if (!commonfunct.bankpermissions(req).can_edit_customers) {
        res.json({ reqwas: req.body, error: "User has no can_edit_customers" })
    }
    else {
        customersservice.set(question, input).then(
            function (resp) { res.json(resp) }
        );
    }
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.name, "i") 
    if (req.params.id) { question._id = req.params.id; }
    if (!commonfunct.bankpermissions(req))
    { 
        res.json({ reqwas: req.body, error: "User has no relation with this bank" })
    }
    else if (!commonfunct.bankpermissions(req).can_edit_customers) {
        res.json({ reqwas: req.body, error: "User has no can_edit_customers" })
    }
    else {
        customersservice.del(question).then(
            function (resp) { res.json(resp) }
        );
    }
};