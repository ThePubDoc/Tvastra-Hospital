const mongoose = require("mongoose")

const schema = mongoose.Schema

const userSchema = new schema({
    name : {type : String ,required : true},
    email : {type : String , required : true, unique: true},
    password : {type: String,required: true},
    gender : {type: String , required : true},
    dob : {type: Date, required : true},
    phone : {type: Number, required: true , unique: true},
    city : {type: String, required: true},
    state : {type:String, required: true},
    country : {type : String,required:true},
    dp : {type : String,required:false}
},{timestamps : true})

module.exports = users = mongoose.model("users" , userSchema);