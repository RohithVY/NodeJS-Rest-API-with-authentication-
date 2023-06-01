const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productId:{
        type:String
    },
    name:{
        type:String, 
        required:[true, "name is required"],
        min: 3,
        max: 12
    },
    description:{
        type:String,
        required:[true, "description is required"],
        min: 50,
        max: 150
    },
    price:{
        type:Number, 
        required:[true, "price field is required"]
    },
    files:{
        type: Array
        // required:  [true, "image file or files is required"]    
    }
 });

module.exports = mongoose.model('Product', productSchema);
