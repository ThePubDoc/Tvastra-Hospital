const mongoose = require("mongoose")

const schema = mongoose.Schema

const hospitalSchema = new schema({
    name : {type:String , required: true},
    dp : {type:String}
},{timestamps : true})

module.exports = hospital = mongoose.model("hospital", hospitalSchema);