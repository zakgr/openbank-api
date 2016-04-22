//mongo data 
import Q = require('q');
import mongoose = require('mongoose');
import eventsmodels = require('../../models/events/model');
var eventmodel = new eventsmodels.event();

//Transform
export function convertschema() {
    var tempschema = eventmodel._schema;
    tempschema.set('toJSON', {
        transform: function(doc, ret, options) {
            ret.eveid = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });
    return tempschema;
}

export function listAll() {
    var deferred = Q.defer();
    var eventschema = convertschema();
    var theevent = mongoose.model('event', eventschema);
    theevent.find({}, function(err, found: eventsmodels.eventdef[]) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function list(string: string) {
    var deferred = Q.defer();
    var eventschema = convertschema();
    var theevent = mongoose.model('event', eventschema);
    theevent.findOne(string, function(err, found: eventsmodels.eventdef) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function set(string: string, object: eventsmodels.eventdef) {
    function update() {
        theevent.update({ _id: insert._id }, insert, { upsert: true, setDefaultsOnInsert: true },
            function(err2, found) {
                if (err2) deferred.resolve({ error: err2 });
                deferred.resolve(found)
            });
    }
    var deferred = Q.defer();
    var insert = eventmodel.set(object);
    var theevent = mongoose.model('event', eventmodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        theevent.findOne(string)
            .select('islocked').exec(function(err, found: eventsmodels.eventdef) {
                if (err) deferred.resolve({ error: err })
            else if (!found){deferred.resolve({ error: "Item not exists" })}
            else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
                else {
                    if (found && found._id) { insert._id = found._id; }
                    update();
                }
            });
    }
    return deferred.promise;
}

export function del(string: string) {
    var deferred = Q.defer();
    var theevent = mongoose.model('event', eventmodel._schema);
    theevent.findOne(string)
        .select('islocked').exec(function(err, found: eventsmodels.eventdef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found){deferred.resolve({ error: "Item not exists" })}
            else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
            else {
                theevent.remove({ _id: found._id }, function(err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}