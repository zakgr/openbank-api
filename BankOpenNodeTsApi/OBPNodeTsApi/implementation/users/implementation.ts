//user implementation
import express = require('express');
import usersservice = require('../../services/users/service');
import commonfunct = require('../../implementation/commonfunct');

export function list(req: express.Request, res: express.Response, next) {
    usersservice.listAll().then(
        function (resp) { res.json({ users: resp }) }
    );
};
export function listmore(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var provider_name = req.header('Auth-Provider-Name');
    var auth_id = req.header('Auth-ID');
    if (provider_name && auth_id) {
        question.auth_provider_name = provider_name;
        question.auth_id = auth_id;
    }
    usersservice.listMore(question).then(
        function (resp) { res.json({ users: resp }) }
    );
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var input = req.body;
    var provider_name = req.header('Auth-Provider-Name');
    var auth_id = req.header('Auth-ID');
    question.auth_provider_name = input.providers[0].auth_provider_name;
    question.auth_id = input.providers[0].auth_id;
    if (input.providers.length == 1) {
        usersservice.listMore(question).then(
            function (resp) {
                if (!resp || req.params.id) {
                    question = {};
                    if (req.params.id){question._id=req.params.id}
                    usersservice.set(question, input).then(
                        function (resp) { res.json({ users: resp }) }
                    );
                }
                else {
                    res.json("Provider Exists")
                }
            }
        );
    }
    else { res.json("No Provider Added or only one Provider can be Added") }
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    if (req.params.id) { question._id = req.params.id; }
    usersservice.del(question).then(
        function (resp) { res.json(resp) }
    );
};