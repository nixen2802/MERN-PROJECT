const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const MainBillSchema=new Schema({
    billnumber: {type: Number, required: true},
    customer_name: {type: String, required: true},
    date_of_supply: {type: Date, required: true},
    total_amount: {type:  Number, required: true},
    gst: {type: Number, required: true},
    place_of_supply: {type: String, required: true},
    transporter_info: {type: String, required: true},
    gst_no: {type: String, required: true},
    billing_address: {type: String, required: true},
    status: {type: String, require: true}
});
const Mainbill= mongoose.model('mainbill',MainBillSchema);
module.exports=Mainbill