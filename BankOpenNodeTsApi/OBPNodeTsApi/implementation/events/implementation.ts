//event implementation
import express = require('express');
import eventsservice = require('../../services/events/service');

export function list(req: express.Request, res: express.Response, next) {
    eventsservice.listAll().then(
        function (resp) {
            res.json(
                { events: resp }
            )
        }
    );
};
export function get(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.name) { question.name = new RegExp(req.body.payload.name, "i"); }
    if (req.body.payload.category) { question.category = new RegExp(req.body.payload.category, "i"); }
    if (req.body.payload.place) { question.place = new RegExp(req.body.payload.place, "i"); }
    if (req.body.payload.eveid) { question._id = req.body.payload.eveid; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    eventsservice.list(question).then(
        function (resp) {
            res.json(
              resp 
            )
        }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.eveid) { question._id = req.body.payload.eveid; }
    if (!req.body.payload.insert) {
        res.json({ reqwas: req.body.payload, error: "No insert input" })
    }
    //if (JSON.stringify(question) === "{}") {
    //    res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    //}
    eventsservice.set(question, req.body.payload.insert).then(
        function (resp) {
            res.json(
                { payload: resp }
            )
        }
    );
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.eveid) { question._id = req.body.payload.eveid; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    eventsservice.del(question).then(
        function (resp) {
            res.json(
                { payload: resp }
            )
        }
    );
};