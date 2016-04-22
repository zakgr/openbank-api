//mongo data 
import Q = require('q');
import mongoose = require('mongoose');
import socialsmodels = require('../../models/socials/model');
var socialmodel = new socialsmodels.social();

//Transform
export function convertschema() {
    var tempschema = socialmodel._schema;
    tempschema.set('toJSON', {
        transform: function(doc, ret, options) {
            ret.sid = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });
    return tempschema;
}



export function listAll() {
    var deferred = Q.defer();
    var socialschema = convertschema();
    var thesocial = mongoose.model('social', socialschema);
    thesocial.find({}, function(err, found: socialsmodels.socialdef[]) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function list(string: string) {
    var deferred = Q.defer();
    var socialschema = convertschema();
    var thesocial = mongoose.model('social', socialschema);
    thesocial.findOne(string, function(err, found: socialsmodels.socialdef) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function set(string: string, object: socialsmodels.socialdef) {
    function update() {
        thesocial.update({ _id: insert._id }, insert, { upsert: true, setDefaultsOnInsert: true },
            function(err2, found) {
                if (err2) deferred.resolve({ error: err2 });
                deferred.resolve(found)
            });
    }
    var deferred = Q.defer();
    var insert = socialmodel.set(object);
    var thesocial = mongoose.model('social', socialmodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        thesocial.findOne(string)
            .select('islocked').exec(function(err, found: socialsmodels.socialdef) {
                if (err) deferred.resolve({ error: err });
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
    var thesocial = mongoose.model('social', socialmodel._schema);
    thesocial.findOne(string)
        .select('islocked').exec(function(err, found: socialsmodels.socialdef) {
            if (err) { deferred.resolve({ error: err }) }
else if (!found){deferred.resolve({ error: "Item not exists" })}
            else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
            else {
                thesocial.remove({ _id: found._id }, function(err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}