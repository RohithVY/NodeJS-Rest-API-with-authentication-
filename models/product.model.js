//Importing the mongoose library
const mongoose = require("mongoose");

//using monoose to create the product schema
const productSchema = mongoose.Schema({
    productId:{
        type:String
    },
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:String, 
    },
 });

//exporting the product schema
module.exports = mongoose.model('Product', productSchema);