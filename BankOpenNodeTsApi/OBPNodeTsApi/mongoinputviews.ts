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
//Input atms
import views = require('./models/views/model');
var file = fs.readFileSync('.././data/views.json', 'utf8');
var obj = JSON.parse(file.replace(/^\uFEFF/, ''));
var b = new views.view();
// console.log("before json");
console.log(obj.payload[0]);
obj.payload.forEach(function (item) {
    if (item.code != null) {
        console.log("code " + item.code);
        var a: any = {
            _id: null,
            name: item.code + "|" + item.name,
            category: item.category,
            place: item.place,
            start_time: "12/10/2010",
            islocked: true,
            attending_count: item.attending_count
        };
        console.log(a);
        var c = b.set(a);
        c.save(function (err, item: any) {
            if (err) throw err;
            console.log('event saved successfully!');
            if (item != null) {
            }
        });

    }
})