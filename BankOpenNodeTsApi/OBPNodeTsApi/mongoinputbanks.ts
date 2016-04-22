//connector 
import mongoose = require('mongoose');
import fs =  require('fs');
import config = require('config');
mongoose.connect(config.get<string>('dbConfigs.mongodb.connectionstring'));
var mongoosetypes = mongoose.Schema.Types;

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('.././data/banks.csv')
});


//Input banks
import banks = require('./models/banks/model');

//var obj = JSON.parse(file.replace(/^\uFEFF/, ''));
var b = new banks.bank();
lineReader.on('line', function (line) {
   var items = line.split(";");
    if (items[0] != null) {
      //  console.log("obj[1] : " + item.code);
        var id= null;
        if (items[0] === "011"){
          var id  =  mongoose.mongo.ObjectId("5710bba5d42604e4072d1e72");
            }
            
        var a: any =  {
            _id: id,
            islocked: true,
            website:  items[9],
            full_name: items[1] + " (" + items[0]+ ")",
            short_name: items[7]

 
        };
        console.log("item:"+ JSON.stringify(a) + "\n");

        var c = b.set(a);
       
        c.save(function (err, item: any) {
          //  if (err) throw err;
            console.log('bank saved successfully!');
            if (item != null) {
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