// views implementation
import express = require('express');
import viewsservice = require('../../services/views/service');
import accountsservice = require('../../services/accounts/service');
import commonfunct = require('../../implementation/commonfunct');
var name = { views: null };

export function listbid(req: express.Request, res: express.Response, next) {
    var question: any = {};
    question.bank_id = req.params.bid;
    question.is_public = true;
    viewsservice.listBid(question).then(
        function (resp) {
            commonfunct.response(resp, name, res, next)
        }
    );
};
export function listid(req: express.Request, res: express.Response, next) {
    //console.log(req.params.id);
    var question: any = {};
    question.bank_id = req.params.bid;
    question.account_id = req.params.acid;
    question._id = req.params.id;
    viewsservice.listId(question).then(
        function (resp) {
            commonfunct.response(resp, name, res, next)
        }
    );
};

export function listmore(req: express.Request, res: express.Response, next) {
    var check = { field: ['data'], params: [req, res, next] };
    if (commonfunct.check(check)) {
        var question: any = {};
        if (req.body.id) { question._id = req.body.id; }
        viewsservice.listMore(question).then(
            function (resp) {
                commonfunct.response(resp, name, res, next)
            }
        );
    }
};
export function set(req: express.Request, res: express.Response, next) {
    var question: any = {};
    var input = req.body;
    for (var item in input) {
        if (item.search('can') > -1) { delete input[item] }
    }
    input.bank_id = req.params.bid;


    if (req.params.id) { question._id = req.params.id; }
    viewsservice.set(question, input).then(
        function (resp) {
            if (req.params.acid) {
                var quest: any = {};
                var inp: any = [];
                quest._id = req.params.acid;
                inp[0] = resp['data'].id.toString();
                //missing code add or ensure view is in account available_views
                accountsservice.setid(quest, inp).then(
                    function (resp2) {
                        commonfunct.response(resp, name, res, next)
                    });
            }
            //commonfunct.response(resp, name, res, next)


        });
};
export function del(req: express.Request, res: express.Response, next) {
    var question: any = {};
    // like example new RegExp(req.body.name, "i") 

    if (req.params.id) { question._id = req.params.id; }
    viewsservice.del(question).then(
        function (resp) {
            if (req.params.acid) {
                //todo
                //missing code add view to account available views
                //check that view is not the last one or put default if last
            }
            commonfunct.response(resp, name, res, next)
        });
};