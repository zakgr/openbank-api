//connector 
import mongoose = require('mongoose');
import fs = require('fs');
import config = require('config');
//connect database
mongoose.connect(
    config.get<string>('dbConfigs.mongodb.type') + "://" +
    config.get<string>('dbConfigs.mongodb.host') + ":" +
    config.get<string>('dbConfigs.mongodb.port') + "/" +
    config.get<string>('dbConfigs.mongodb.name')
);

//var lineReader = require('readline').createInterface({
//  input: require('fs').createReadStream('.././data/products.csv')
//});

//lineReader.on('line', function (line) {
//  console.log('Line from file:', line);
//});
//Input products
import customers = require('./models/customers/model');

//var obj = JSON.parse(file.replace(/^\uFEFF/, ''));
var b = new customers.customer();
//lineReader.on('line', function (line) {
//   var items = line.split(",");
//  if (items[0] != null) {
//  console.log("obj[1] : " + item.code);

//       if (items[4] && items[4].length > 4 ){
var id = mongoose.mongo.ObjectId("5731e8bf7315923c15ac9762");
var bid = mongoose.mongo.ObjectId("5710bba5d42604e4072d1e72");

//           }
var a: any = {
    _id: id,
    bank_id: bid,
    legal_name: "FanisCustomer2"

};

var c = b.set(a);
c.save(function (err, item: any) {
    if (err) throw err;
    console.log('customer saved successfully!');
    if (item != null) {
    }
});
