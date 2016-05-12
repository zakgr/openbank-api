//connector 
import mongoose = require('mongoose');
import fs =  require('fs');
import config = require('config');
//connect database
mongoose.connect(
    config.get<string>('dbConfigs.mongodb.type') + "://" +
    config.get<string>('dbConfigs.mongodb.host') + ":" +
    config.get<string>('dbConfigs.mongodb.port') + "/" +
    config.get<string>('dbConfigs.mongodb.name')
);

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('.././data/accounts.csv')
});


//Input accounts
import accounts = require('./models/accounts/model');

//var obj = JSON.parse(file.replace(/^\uFEFF/, ''));
var b = new accounts.account();
lineReader.on('line', function (line) {
   var items = line.split(",");
    if (items[0] != null) {
     
      var arr=[items[1]];
        var a: any =  {
            _id: null,
            number: items[0],
            owners: ["571355e4432c0cdc13647990"],
            type: items[1],
            balance: items[3].toString(),
            IBAN: "IBAN" + items[0],
            islocked: true,
            bank_id: "5710bba5d42604e4072d1e72"
        };
        console.log("item:"+ JSON.stringify(a) + "\n");

        var c = b.set(a);
       
        c.save(function (err, item: any) {
            if (err) throw err;
         
            if (item != null) {   console.log('account saved successfully!');
            }
        });

    }
})








//var bank = new banks.bank();
//var chris = bank.set( 11 , 'NBG GR', false);
//var chris = bank.set(115, 'NBG GR 15');
//console.log(chris.isNew);
/////call the built-in save method to save to the database
//chris.save(function (err, item: banks.bankdef) {
//    if (err) throw err;
//    console.log('bank saved successfully!');
//    if (item != null) {

//    }
//});
  

/////call the built-in find return fields from the database
//var thebank = mongoose.model('bank', bank._schema);

////http://mongoosejs.com/docs/2.7.x/docs/finding-documents.html