//other api data 
import Q = require('q');
import mongoose = require('mongoose');
import viewsmodels = require('../../models/views/model');
import commonfunct = require('../../services/commonfunct');
var viewmodel = new viewsmodels.view();

//Transform
var viewschema = viewmodel._schema;
viewschema.set('toJSON', {
    transform: function (doc, ret, options) {
        //     try { ret.bank_id = ret.bank_id.text; } catch (err) { }
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

export function listBid(string: string) {
    var deferred = Q.defer();
    var theview = mongoose.model('view', viewschema);
    theview.find(string)
        .exec(function (err, found: viewsmodels.viewdef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function listId(string: string) {
    var deferred = Q.defer();
    var theview = mongoose.model('view', viewschema);
    theview.findOne(string)
        .exec(function (err, found: viewsmodels.viewdef) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function listMore(string: string) {
    var deferred = Q.defer();
    var theview = mongoose.model('view', viewschema);
    theview.find(string)
        .exec(function (err, found: viewsmodels.viewdef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}

export function set(string: string, object: viewsmodels.viewdef) {
    var deferred = Q.defer();
    var insert = viewmodel.set(object);
    var theview = mongoose.model('view', viewmodel._schema);
    if (JSON.stringify(string) === "{}") {
        commonfunct.update(insert,theview,deferred);
    }
    else {
        theview.findOne(string)
            .select('islocked').exec(function (err, found: viewsmodels.viewdef) {
                if (err) deferred.resolve({ error: err });
                else if (!found) { deferred.resolve({ error: "Item not exists" }) }
                // else if ( found.islocked) { deferred.resolve({ error: "This item is locked" }) }
                else {
                    if (found && found._id) { insert._id = found._id; }
                    commonfunct.update(insert,theview,deferred);
                }
            });
    }
    return deferred.promise;
}

export function del(string: string) {
    var deferred = Q.defer();
    var theview = mongoose.model('view', viewmodel._schema);
    theview.findOne(string)
        .select('islocked').exec(function (err, found: viewsmodels.viewdef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found) { deferred.resolve({ error: "Item not exists" }) }
            //  else if ( found.islocked) {deferred.resolve({ error: "This item is locked" })}
            else {
                theview.remove({ _id: found._id }, function (err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}