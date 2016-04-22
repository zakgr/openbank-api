// transactions implementation
import express = require('express');
import transactionsservice = require('../../services/transactions/service');

export function list(req: express.Request, res: express.Response, next) {
    transactionsservice.listAll().then(
        function(resp) {
            res.json(
                { transactions: resp }
            )
        }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.this_account ) { question.this_account = req.body.payload.this_account; }
    if (req.body.payload.other_account ) { question.other_account = req.body.payload.other_account; }    
    if (req.body.payload.this_account_insystem ) { question.this_account_insystem = req.body.payload.this_account_insystem; }    
    if (req.body.payload.other_account_insystem ) { question.other_account_insystem = req.body.payload.other_account_insystem; }   
    
    if (req.body.payload.details.date) {
         question.details = {};
         question.details.posted = new RegExp(req.body.payload.details.date, "i"); 
         
        }   
    
    if (req.body.payload.uuid) { question.uuid = req.body.payload.uuid; }
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    transactionsservice.listMore(question).then(
        function(resp) {
            res.json(
                { transactions: resp }
            )
        }
    );
};
export function get(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.this_account ) { question.this_account = req.body.payload.this_account; }
    if (req.body.payload.other_account ) { question.other_account = req.body.payload.other_account; }    
    if (req.body.payload.this_account_insystem ) { question.this_account_insystem = req.body.payload.this_account_insystem; }    
    if (req.body.payload.other_account_insystem ) { question.other_account_insystem = req.body.payload.other_account_insystem; }   
    
    if (req.body.payload.details.date) {
         question.details = {};
         question.details.posted = new RegExp(req.body.payload.details.date, "i"); 
         
        }   
    
    if (req.body.payload.uuid) { question.uuid = req.body.payload.uuid; }
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    transactionsservice.list(question).then(
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
    transactionsservice.set(question, req.body.payload.insert).then(
        function(resp) { res.json(resp) });
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    transactionsservice.del(question).then(
        function(resp) { res.json(resp) });
};