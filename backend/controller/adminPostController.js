const Users = require("../models/user");

async function edit(req,res){
    
    const user = await Users.findOne({email : req.body.email});
    res.redirect("edit/user/"+user._id)
}

module.exports = {
    edit,
}