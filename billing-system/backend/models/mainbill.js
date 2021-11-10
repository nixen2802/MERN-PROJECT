const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const MainBillSchema=new Schema({
    billlnumber: {type: Number, required: true},
    total_amount: {type:  Number, required: true},
    company_name: {type: String, required: true}
});
const Mainbill= mongoose.model('mainbill',MainBillSchema);
module.exports=Mainbill