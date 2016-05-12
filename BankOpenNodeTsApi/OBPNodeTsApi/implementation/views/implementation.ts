// views implementation
import express = require('express');
import viewsservice = require('../../services/views/service');

export function listbid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    question.account_id = req.params.acid;
    viewsservice.listBid(question).then(
        function (resp) { res.json({ views: resp }) }
    );
};
export function listid(req: express.Request, res: express.Response, next) {
    //console.log(req.params.id);
    var question: any = {};
    question.bank_id = req.params.bid;
    question.account_id = req.params.acid;
    question._id = req.params.id;
    viewsservice.listId(question).then(
        function (resp) { res.json(resp) }
    );
};

export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.name, "i") 
   if (req.body.id) { question._id = req.body.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    }
    viewsservice.listMore(question).then(
        function(resp) { res.json({ views: resp }) }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var input = req.body;
    input.bank_id = req.params.bid;
    input.account_id = req.params.acid;
    if (req.params.id) { question._id = req.params.id; }
    viewsservice.set(question, input).then(
        function(resp) { res.json(resp) });
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.name, "i") 
    if (req.body.id) { question._id = req.body.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    }
    viewsservice.del(question).then(
        function(resp) { res.json(resp) });
};