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
console.log("start");
//Input atms
import metadatas = require('./models/metadata/model');
var file = fs.readFileSync('.././data/metadata.json', 'utf8');
var obj = JSON.parse(file.replace(/^\uFEFF/, ''));
var b = new metadatas.metadata();
console.log("before json");

obj.metadata.forEach(function(item) {
    var a: any = {
        _id:  mongoose.mongo.ObjectId(item.id),
        text: item.text,
            islocked: true
    };

    var c = b.set(a);
    c.save(function(err, item: any) {
        if (err) throw err;
        console.log('metadata saved successfully!');
        if (item != null) {
        }
    });


})
