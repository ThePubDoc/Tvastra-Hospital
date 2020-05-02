const Users = require("../models/user");

const success = {
    msg : "Successful Login",
    type : "success",
    user : ""
}

const empty = {
    msg : "",
    type : "",
    user : ""
}

async function index(req,res){
    const user = await Users.findOne({email : req.session.user.email});
    const requireFields = {
        name : user.name,
        email : user.email,
        phone : user.phone,
        dp : user.dp,
    }
    req.session.count++;
    if(req.session.count === 2){
        success.user = requireFields;
        res.render("adminIndex" , success)
    }
    else{
        empty.user = requireFields;
        res.render("adminIndex" , empty)
    }
}

module.exports = {
    index,
}