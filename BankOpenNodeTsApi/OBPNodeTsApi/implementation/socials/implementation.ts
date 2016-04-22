//social implementation
import express = require('express');
import socialsservice = require('../../services/socials/service');

export function list(req: express.Request, res: express.Response, next) {
    socialsservice.listAll().then(
        function (resp) {
            res.json(
                { payload: resp }
            )
        }
    );
};
export function get(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.typen, "i") 
    if (req.body.payload.typen) { question.typen = new RegExp(req.body.payload.typen, "i"); }
    if (req.body.payload.handle) { question.handle = new RegExp(req.body.payload.handle, "i"); }
    if (req.body.payload.sid) { question._id = req.body.payload.sid; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    socialsservice.list(question).then(
        function (resp) {
            res.json(
                { socials: resp }
            )
        }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.typen, "i") 
    if (req.body.payload.sid) { question._id = req.body.payload.sid; }
    if (!req.body.payload.insert) {
        res.json({ reqwas: req.body.payload, error: "No insert input" })
    }
    //if (JSON.stringify(question) === "{}") {
    //    res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    //}
    socialsservice.set(question, req.body.payload.insert).then(
        function (resp) {
            res.json(
                resp 
            )
        }
    );
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.typen, "i") 
    if (req.body.payload.sid) { question._id = req.body.payload.sid; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    socialsservice.del(question).then(
        function (resp) {
            res.json(
                { payload: resp }
            )
        }
    );
};