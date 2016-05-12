//mongo data 
import Q = require('q');
import mongoose = require('mongoose');
import customersmodels = require('../../models/customers/model');
var customermodel = new customersmodels.customer();

//Transform
var customerschema = customermodel._schema;
customerschema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.customer_number = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
export function listBid(string: string) {
    var deferred = Q.defer();
    var thecustomer = mongoose.model('customer', customerschema);
    thecustomer.find(string)
        .exec(function (err, found: customersmodels.customerdef[]) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}
export function listId(string: string) {
    var deferred = Q.defer();
    var thecustomer = mongoose.model('customer', customerschema);
    thecustomer.findOne(string)
        .exec(function (err, found: customersmodels.customerdef) {
            if (err) deferred.resolve({ error: err });
            deferred.resolve(found)
        });
    return deferred.promise;
}
export function listMore(string: string) {
    var deferred = Q.defer();
    var thecustomer = mongoose.model('customer', customerschema);
    thecustomer.find(string, function (err, found: customersmodels.customerdef[]) {
        if (err) deferred.resolve({ error: err });
        deferred.resolve(found)
    });
    return deferred.promise;
}

export function set(string: string, object: customersmodels.customerdef) {
    function update() {
        insert.validate(function (err) {
            if (err) {
                deferred.resolve(err);
                return;
            }
            thecustomer.findByIdAndUpdate(insert._id, insert, { upsert: true, new: true },
                function (err2, found) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve(found)
                });
        });
    }
    var deferred = Q.defer();
    var insert = customermodel.set(object);
    var thecustomer = mongoose.model('customer', customermodel._schema);
    if (JSON.stringify(string) === "{}") {
        update();
    }
    else {
        thecustomer.findOne(string)
            .select('islocked').exec(function (err, found: customersmodels.customerdef) {
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
    var thecustomer = mongoose.model('customer', customermodel._schema);
    thecustomer.findOne(string)
        .select('islocked').exec(function (err, found: customersmodels.customerdef) {
            if (err) { deferred.resolve({ error: err }) }
            else if (!found) { deferred.resolve({ error: "Item not exists" }) }
            else if (found.islocked) { deferred.resolve({ error: "This item is locked" }) }
            else {
                thecustomer.remove({ _id: found._id }, function (err2) {
                    if (err2) deferred.resolve({ error: err2 });
                    deferred.resolve({ "ok": 1 })
                });
            }
        });

    return deferred.promise;
}