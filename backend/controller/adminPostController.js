const Users = require("../models/user");

async function edit(req,res){
    
    const user = await Users.findOne({email : req.body.email});
    res.redirect("edit/user/"+user._id)
}

async function editUser(req,res){
    const id = req.params.id;
    // const user = await Users.findOne({_id : id});
    const {name,phone,email,gender,dob,blood,time_zone,location,state,country} = req.body;
    const updatedUser = await Users.findByIdAndUpdate({_id : id} , req.body)
    res.redirect("/admin")
}

module.exports = {
    edit,
    editUser
}