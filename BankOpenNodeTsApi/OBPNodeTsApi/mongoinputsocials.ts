//connector 
import mongoose = require('mongoose');
import fs = require('fs');
import config = require('config');
mongoose.connect(config.get<string>('dbConfigs.mongodb.connectionstring'));

//Input atms
import socials = require('./models/socials/model');
var file = fs.readFileSync('.././data/socials.json', 'utf8');
var obj = JSON.parse(file.replace(/^\uFEFF/, ''));
var b = new socials.social();
// console.log("before json");
// console.log(obj.payload[0]);
obj.payload.forEach(function (item) {
    if (item.code != null) {
        console.log("code : " + item.code);
        var a: any = {
            _id: null,
            typen: item.code + "|" + item.typen,
            enable:"true",
            islocked: true,
            handle: item.handle
        };
        console.log(a);
        var c = b.set(a);
        c.save(function (err, item: any) {
            if (err) throw err;
            console.log('socials saved successfully!');
            if (item != null) {
            }
        });

    }
})