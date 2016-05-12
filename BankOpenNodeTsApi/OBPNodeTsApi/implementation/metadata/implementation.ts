//metadatas implemantation
import express = require('express');
import metadatasservice = require('../../services/metadata/service');

export function list(req: express.Request, res: express.Response, next) {
    metadatasservice.listAll().then(
        function (resp) { res.json({ metadata: resp }) }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.body.id) { question._id = req.body.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    }
    metadatasservice.listMore(question).then(
        function (resp) { res.json({ metadata: resp }) }
    );
};
export function get(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.body.id) { question._id = req.body.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    }
    metadatasservice.list(question).then(
        function (resp) { res.json(resp) }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.body.id) { question._id = req.body.id; }
    if (!req.body.insert) {
        res.json({ reqwas: req.body, error: "No insert input" })
    }
    //if (JSON.stringify(question) === "{}") {
    //    res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    //}
    metadatasservice.set(question, req.body.insert).then(
        function (resp) { res.json(resp) }
    );
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.name, "i") 
    if (req.body.id) { question._id = req.body.id; }
    if (JSON.stringify(question) === "{}") {
        res.json({ reqwas: req.body, error: "No input data or wrong input data" })
    }
    metadatasservice.del(question).then(
        function (resp) { res.json(resp) }
    );
};