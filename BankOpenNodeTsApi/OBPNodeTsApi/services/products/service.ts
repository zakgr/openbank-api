//mongo data 
import Q = require('q');
import mongoose = require('mongoose');
import productsmodels = require('../../models/products/model');
var productmodel = new productsmodels.product();

//Transform
var productschema = productmodel._schema;
productschema.set('toJSON', {
    transform: function (doc, ret, options) {
        //     try { ret.bank_id = ret.bank_id.text; } catch (err) { }
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

export function listBid(string: string) {
    var deferred = Q.defer();
    var theproduct = mongoose.model('product', productschema);
    theproduct.find(string)
        .exec(function (err, found: productsmodels.productdef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}
export function listId(string: string) {
    var deferred = Q.defer();
    var theproduct = mongoose.model('product', productschema);
    theproduct.find(string)
        .exec(function (err, found: productsmodels.productdef) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}
export function listMore(string: string) {
    var deferred = Q.defer();
    var theproduct = mongoose.model('product', productschema);
    theproduct.find(string)
        //   .populate('bank_id', 'text') // only works if we pushed refs to children
        .exec(function (err, found: productsmodels.productdef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}
export function set(string: string, object: productsmodels.productdef) {
    function update() {
        insert.validate(function (err) {
            if (err) {
                deferred.resolve(err);
                return;
            }
            theproduct.findByIdAndUpdate(insert._id, insert, { upsert: true, new: true },
                function (err2, found) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve(found)
                });
        });
    }
    var deferred = Q.defer();
    var insert = productmodel.set(object);
    var theproduct = mongoose.model('product', productmodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        theproduct.findOne(string)
            .select('islocked').exec(function (err, found: productsmodels.productdef) {
                if (err) deferred.resolve({ error: err })
                else if (!found) { deferred.resolve({ error: "Item not exists" }) }
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
    var theproduct = mongoose.model('product', productmodel._schema);
    theproduct.findOne(string)
        .select('islocked').exec(function (err, found: productsmodels.productdef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found) { deferred.resolve({ error: "Item not exists" }) }
            else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
            else {
                theproduct.remove({ _id: found._id }, function (err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}