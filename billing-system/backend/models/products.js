const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const User=require('../models/users')
const ProductSchema=new Schema({
    name: {type: String, required: true},
    item_code: {type: Number, required: true},
    price: {type: Number , required: true},
    hsn_code: {type: Number, required: true}
});
const Product= mongoose.model("products",ProductSchema);
module.exports= Product