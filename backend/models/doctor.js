const mongoose = require("mongoose")

const schema = mongoose.Schema

const doctorSchema = new schema({
    name : {type : String ,required : true},
    email : {type : String , required : true, unique: true},
    password : {type: String,required: true},
    gender : {type: String , required : true},
    dob : {type: Date, required : true},
    phone : {type: Number, required: true , unique: true},
    city : {type: String, required: true},
    state : {type:String, required: true},
    country : {type : String,required:true},
    dp : {type : String,required:false},
    description : {type: String, required:false},
    speciality : {type: Array, required:false},
    education : {type: Array, required:false},
    treatment : {type: Array, required:false},
    hospitals : {type: Array, required:false},
    achievements : {type: Array, required:false},
    awards : {type: Array, required:false},
    achievements : {type: Array, required:false},
    experience : {type: Number,required:false},
    fees : {type: Number,required:false},
},{timestamps : true})

module.exports = doctors = mongoose.model("doctors" , doctorSchema);