// branches implementation
import express = require('express');
import branchesservice = require('../../services/branches/service');

//connect to legacy public services example
export function list2(req: express.Request, res: express.Response, next) {
    var reqbody;
    if (req.method == 'GET') {
        reqbody = {
            payload: {}
        };
    }
    else {
        reqbody = req.body;
    }
    if (req.body.payload instanceof Array)
    { res.status(500).send('Error!payload cannot be an array'); res.json('Error!payload cannot be an array'); }
    else {
        branchesservice.listAll2(reqbody).then(
            function (resp) {
                res.json(resp);
            }
        );
    }
};


export function list(req: express.Request, res: express.Response, next) {
    branchesservice.listAll().then(
        function (resp) {
            res.json(
                { branches: resp }
            )
        }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.city) { question.city = new RegExp(req.body.payload.city, "i"); }
    if (req.body.payload.name) { question.name = new RegExp(req.body.payload.name, "i"); }
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    branchesservice.listMore(question).then(
        function (resp) {
            res.json(
                { branches: resp }
            
            )
        }
    );
};
export function get(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.city) { question.city = new RegExp(req.body.payload.city, "i"); }
    if (req.body.payload.name) { question.name = new RegExp(req.body.payload.name, "i"); }
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    branchesservice.list(question).then(
        function (resp) {
            res.json(
               resp 
            )
        }
    );
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
    branchesservice.set(question, req.body.payload.insert).then(
        function (resp) {
            res.json(
                { branches: resp }
            )
        }
    );
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    branchesservice.del(question).then(
        function (resp) {
            res.json(
                { branches: resp }
            )
        }
    );
};