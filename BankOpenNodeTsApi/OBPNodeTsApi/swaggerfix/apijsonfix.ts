//connector 

import fs = require('fs');
import config = require('config');

console.log("start");

//function firstToUpperCase( str ) {
//    return str.substr(0, 1).toUpperCase() + str.substr(1);
//}
var file = fs.readFileSync('../../public/api.json', 'utf8');
var obj = JSON.parse(file.replace(/^\uFEFF/, ''));
var file2 = fs.readFileSync('order.json', 'utf8');
var map = JSON.parse(file2.replace(/^\uFEFF/, ''));
console.log("before json");
var pro
var pro2
var items
obj.basePath='/';
//console.log(Object.keys(obj.paths));
for (pro in obj.paths) {
    //console.log(pro);
    var temp = obj.paths[pro];
    for (pro2 in temp) {
        var res = temp[pro2].operationId;
        res = res.replace(pro2,"");
        res = res.replace(/[0-9]/g,"")
        //var num = res.length-1;
        //res = firstToUpperCase(res[num]+"s")
        if (temp[pro2].tags) temp[pro2].tags[0] = res;

    }
    for (items in map){
        //console.log (items+" "+pro)
        if (items == pro){
            map[items]=obj.paths[pro]
            break;
            };
        
    }
    //console.log(temp);
}
obj.paths = map;
delete obj.tags;
fs.writeFileSync('../../public/api.json',JSON.stringify(obj), 'utf8');
console.log("end");