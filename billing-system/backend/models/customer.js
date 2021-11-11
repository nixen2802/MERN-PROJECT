const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const CustomerSchema=new Schema({
    cust_name: {type: String, required: true},
    gst_no: {type: String, required: true},
    billing_address: {type: String, required: true}
})
const Customer=mongoose.model('customer', CustomerSchema);
module.exports=Customer;