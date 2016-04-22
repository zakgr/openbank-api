//product implementation
import express = require('express');
import productsservice = require('../../services/products/service');

export function list(req: express.Request, res: express.Response, next) {
    productsservice.listAll().then(
        function (resp) {
            res.json(
                { products: resp }
            )
        }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.name) { question.name = new RegExp(req.body.payload.name, "i"); }
    if (req.body.payload.family) { question.family = new RegExp(req.body.payload.family, "i"); }
    if (req.body.payload.code) { question._id = req.body.payload.code; }
    if (req.body.payload.category) { question.category = req.body.payload.category; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    productsservice.listMore(question).then(
        function (resp) {
            res.json(
                { products: resp }
            )
        }
    );
};
export function get(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.name) { question.name = new RegExp(req.body.payload.name, "i"); }
    if (req.body.payload.family) { question.family = new RegExp(req.body.payload.family, "i"); }
    if (req.body.payload.code) { question._id = req.body.payload.code; }
    if (req.body.payload.category) { question.category = req.body.payload.category; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    productsservice.list(question).then(
        function (resp) {
            res.json(resp )
        }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.code) { question._id = req.body.payload.code; }
    if (!req.body.payload.insert) {
        res.json({ reqwas: req.body.payload, error: "No insert input" })
    }
    //if (JSON.stringify(question) === "{}") {
    //    res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    //}
    productsservice.set(question, req.body.payload.insert).then(
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
    if (req.body.payload.code) { question._id = req.body.payload.code; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    productsservice.del(question).then(
        function (resp) {
            res.json(
                { payload: resp }
            )
        }
    );
};