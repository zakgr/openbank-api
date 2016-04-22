//mongo data 
import Q = require('q');
import mongoose = require('mongoose');
import metadatasmodels = require('../../models/metadata/model');
var metadatamodel = new metadatasmodels.metadata();


//Transform
export function convertschema() {
    var tempschema = metadatamodel._schema;
    tempschema.set('toJSON', {
        transform: function(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });
    return tempschema;
}


export function listAll() {
    var deferred = Q.defer();
    //Transform
    var metaschema = convertschema();
    var themetadata = mongoose.model('metadata', metaschema);
    themetadata.find({}, function(err, found: metadatasmodels.metadatadef[]) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function listMore(string) {
    var deferred = Q.defer();
    //Transform
    var metaschema = convertschema();
    var themetadata = mongoose.model('metadata', metaschema);
    themetadata.find(string, function(err, found: metadatasmodels.metadatadef[]) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function list(string: string) {
    var deferred = Q.defer();
    //Transform
    var metaschema = convertschema();
    var themetadata = mongoose.model('metadata', metaschema);
    themetadata.findOne(string, function(err, found: metadatasmodels.metadatadef) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function set(string: string, object: metadatasmodels.metadatadef) {
    function update() {
        themetadata.update({ _id: insert._id }, insert, { upsert: true, setDefaultsOnInsert: true },
            function(err2, found) {
                if (err2) deferred.resolve({ error: err2 });
                deferred.resolve(found)
            });
    }
    var deferred = Q.defer();
    var insert = metadatamodel.set(object);
    var themetadata = mongoose.model('metadata', metadatamodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        themetadata.findOne(string)
            .select('islocked').exec(function(err, found: metadatasmodels.metadatadef) {
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
    var themetadata = mongoose.model('metadata', metadatamodel._schema);
    themetadata.findOne(string)
        .select('islocked').exec(function(err, found: metadatasmodels.metadatadef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found){deferred.resolve({ error: "Item not exists" })}
            else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
            else {
                themetadata.remove({ _id: found._id }, function(err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}