const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const BillsSchema=new Schema({
    billnumber: {type: Number, required: true},
    product_name: {type: String, required: true},
    quantity: {type: Number, required: true},
    amount: {type: Number, required: true},
    hsn_code: {type: Number, required: true}
});
const User= mongoose.model('bills',BillsSchema);
module.exports= User