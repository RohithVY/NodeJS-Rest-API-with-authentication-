const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userId:{
    type:String,
    unique: true,
    required:[true, "userId is required"]
  }, 
  fullName:{
    type:String,
    required:[true, "fullName is required"]
  }, 
  email:{
    type:String,
    unique: true,
    required:[true, "email is required"]
  }, 
  password: {
    type:String,
    required:[true, "password is required"]
  }, 
  phoneNumber:{
    type:String
  }
})

module.exports = mongoose.model("User", userSchema)