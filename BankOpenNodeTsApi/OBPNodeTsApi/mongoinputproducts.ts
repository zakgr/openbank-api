//connector 
import mongoose = require('mongoose');
import fs =  require('fs');
import config = require('config');
mongoose.connect(config.get<string>('dbConfigs.mongodb.connectionstring'));


var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('.././data/products.csv')
});

//lineReader.on('line', function (line) {
//  console.log('Line from file:', line);
//});
//Input products
import products = require('./models/products/model');

//var obj = JSON.parse(file.replace(/^\uFEFF/, ''));
var b = new products.product();
lineReader.on('line', function (line) {
   var items = line.split(",");
    if (items[0] != null) {
      //  console.log("obj[1] : " + item.code);
        var id= null;
        if (items[4] && items[4].length > 4 ){
          var id  =  mongoose.mongo.ObjectId(items[4]);
            }
        var a: any =  {
            _id: id,
            name: items[1] + " ("+ items[0]+")",
            category: items[2],
            islocked: true,
            bank_id: "5710bba5d42604e4072d1e72"
        };
        
        var c = b.set(a);
        c.save(function (err, item: any) {
            if (err) throw err;
            console.log('product saved successfully!');
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