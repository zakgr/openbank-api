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
//var file = fs.readFileSync('.././data/views.json', 'utf8');
//var obj = JSON.parse(file.replace(/^\uFEFF/, ''));
var b = new views.view();
// console.log("before json");
//console.log(obj.payload[0]);
//obj.payload.forEach(function(item) {
//if (item.code != null) {
//console.log("code " + item.code);
var id1 =mongoose.mongo.ObjectId("573d973a31455adc1de2aa54");
var a: any = {
    _id: id1,
    bank_id: "5710bba5d42604e4072d1e72",
    name: "Public",
    description: "Public",
    is_public: true,
    which_alias_to_use: "public",
    hide_metadata_if_alias_used: false,
    can_see_transaction_this_bank_account: false,
    can_see_transaction_other_bank_account: false,
    can_see_transaction_metadata: false,
    can_see_transaction_description: false,
    can_see_transaction_amount: false,
    can_see_transaction_type: false,
    can_see_transaction_currency: true,
    can_see_transaction_start_date: false,
    can_see_transaction_finish_date: false,
    can_see_transaction_balance: false,
    can_see_comments: false,
    can_see_narrative: false,
    can_see_tags: false,
    can_see_images: false,
    can_see_bank_account_owners: false,
    can_see_bank_account_type: false,
    can_see_bank_account_balance: true,
    can_see_bank_account_currency: true,
    can_see_bank_account_label: false,
    can_see_bank_account_national_identifier: false,
    can_see_bank_account_swift_bic: false,
    can_see_bank_account_iban: false,
    can_see_bank_account_number: false,
    can_see_bank_account_bank_name: false,
    can_see_other_account_national_identifier: false,
    can_see_other_account_swift_bic: false,
    can_see_other_account_iban: false,
    can_see_other_account_bank_name: false,
    can_see_other_account_number: false,
    can_see_other_account_metadata: false,
    can_see_other_account_kind: false,
    can_see_more_info: false,
    can_see_url: false,
    can_see_image_url: false,
    can_see_open_corporates_url: false,
    can_see_corporate_location: false,
    can_see_physical_location: false,
    can_see_public_alias: false,
    can_see_private_alias: false,
    can_add_more_info: false,
    can_add_url: false,
    can_add_image_url: false,
    can_add_open_corporates_url: false,
    can_add_corporate_location: false,
    can_add_physical_location: false,
    can_add_public_alias: false,
    can_add_private_alias: false,
    can_delete_corporate_location: false,
    can_delete_physical_location: false,
    can_edit_narrative: false,
    can_add_comment: false,
    can_delete_comment: false,
    can_add_tag: false,
    can_delete_tag: false,
    can_add_image: false,
    can_delete_image: false,
    can_add_where_tag: false,
    can_see_where_tag: false,
    can_delete_where_tag: false,
    can_initiate_transaction: false,
    can_approve_transaction: false,
    can_cancel_transaction: false,
    can_pause_transaction: false
};
var id2 =null;
var a1: any = {
    _id: id2,
    bank_id: "5710bba5d42604e4072d1e72",
    name: "Private",
    description: "Private",
    is_public: false,
    which_alias_to_use: "private",
    hide_metadata_if_alias_used: false,
    can_see_transaction_this_bank_account: false,
    can_see_transaction_other_bank_account: false,
    can_see_transaction_metadata: false,
    can_see_transaction_label: false,
    can_see_transaction_amount: false,
    can_see_transaction_type: false,
    can_see_transaction_currency: true,
    can_see_transaction_start_date: false,
    can_see_transaction_finish_date: false,
    can_see_transaction_balance: false,
    can_see_comments: false,
    can_see_narrative: false,
    can_see_tags: false,
    can_see_images: false,
    can_see_bank_account_owners: false,
    can_see_bank_account_type: false,
    can_see_bank_account_balance: true,
    can_see_bank_account_currency: true,
    can_see_bank_account_label: false,
    can_see_bank_account_national_identifier: false,
    can_see_bank_account_swift_bic: false,
    can_see_bank_account_iban: false,
    can_see_bank_account_number: false,
    can_see_bank_account_bank_name: false,
    can_see_other_account_national_identifier: false,
    can_see_other_account_swift_bic: false,
    can_see_other_account_iban: false,
    can_see_other_account_bank_name: false,
    can_see_other_account_number: false,
    can_see_other_account_metadata: false,
    can_see_other_account_kind: false,
    can_see_more_info: false,
    can_see_url: false,
    can_see_image_url: false,
    can_see_open_corporates_url: false,
    can_see_corporate_location: false,
    can_see_physical_location: false,
    can_see_public_alias: false,
    can_see_private_alias: false,
    can_add_more_info: false,
    can_add_url: false,
    can_add_image_url: false,
    can_add_open_corporates_url: false,
    can_add_corporate_location: false,
    can_add_physical_location: false,
    can_add_public_alias: false,
    can_add_private_alias: false,
    can_delete_corporate_location: false,
    can_delete_physical_location: false,
    can_edit_narrative: false,
    can_add_comment: false,
    can_delete_comment: false,
    can_add_tag: false,
    can_delete_tag: false,
    can_add_image: false,
    can_delete_image: false,
    can_add_where_tag: false,
    can_see_where_tag: false,
    can_delete_where_tag: false,
    can_initiate_transaction: false,
    can_approve_transaction: false,
    can_cancel_transaction: false,
    can_pause_transaction: false
};
console.log(a);

var c = b.set(a);
c._id=id1;
c.save(function(err, item: any) {
    if (err) throw err;
    console.log('event saved successfully!');
    if (item != null) {
    }
});
var c1 = b.set(a1);
c1._id=id2;
c1.save(function(err, item: any) {
    if (err) throw err;
    console.log('event saved successfully!');
    if (item != null) {
    }
});


 //   }
// })