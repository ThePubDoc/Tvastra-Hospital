const users = require("../models/user")

function signup(req,res){
    console.log(req.body);
}

module.exports = {
    signup : signup,
}