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
import atms = require('./models/branches/model');
var file = fs.readFileSync('.././data/branches.json', 'utf8');
var obj = JSON.parse(file.replace(/^\uFEFF/, ''));
var b = new atms.branche();
console.log("before json");
console.log(obj.payload[0]);
obj.payload.forEach(function(item) {
    if (item.code != null) {
        console.log("obj[1] : " + item.code);
        var a: any = {
            _id: null,
            address: {
                line_1: item.addressGR,
                line_2: item.addressEN,
                line_3: null,
                city: item.areaNameGR,
                state: null,
                postcode: null,
                country: null
            },
            lobby: { is24Hours: item.is24Hours },
            name: item.code+ "|"+ item.nameGR,
            location: {
                latitude: item.latitude,
                longitude: item.longitude
            },
            acceptsDeposits: item.acceptsDeposits,
            islocked: true,
            meta:{license:"5717244442f0d6001dff6c78"},
            bank_id: "5710bba5d42604e4072d1e72"
        };

        var c = b.set(a);
        c.save(function(err, item: any) {
            if (err) throw err;
            console.log('branch saved successfully!');
            if (item != null) {
            }
        });

    }
})