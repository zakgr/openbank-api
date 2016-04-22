//bank implementation
import express = require('express');
import banksservice = require('../../services/banks/service');

export function list(req: express.Request, res: express.Response, next) {
    banksservice.listAll().then(
        function (resp) {
            res.json(
                { banks: resp }
            )
        }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.short_name) { question.short_name = new RegExp(req.body.payload.short_name, "i"); }
    if (req.body.payload.full_name) { question.full_name = new RegExp(req.body.payload.full_name, "i"); }
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    banksservice.listMore(question).then(
        function (resp) {  res.json( { banks: resp })}
    );
};
export function get(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.short_name) { question.short_name = new RegExp(req.body.payload.short_name, "i"); }
    if (req.body.payload.full_name) { question.full_name = new RegExp(req.body.payload.full_name, "i"); }
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    banksservice.list(question).then(
        function (resp) {  res.json(  resp )}
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
    banksservice.set(question, req.body.payload.insert).then(
        function (resp) {  res.json( { banks: resp })}
    );
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.payload.name, "i") 
    if (req.body.payload.id) { question._id = req.body.payload.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body.payload, error: "No input data or wrong input data" })
    }
    banksservice.del(question).then(
        function (resp) {  res.json( { banks: resp })}
    );
};