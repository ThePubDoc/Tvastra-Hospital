const Usres = require('../models/user');


async function login(req,res){
    // console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    const user = await Usres.find({email : email});
    if(user.length == 0){
        console.log("no user found")
        const msg = "No User Found";
        res.redirect("/login")
    }
    if(user.password !== password){
        const msg = "Password is wrong";
    }
    const loggedUser = {
        id : user._id,
        name : user.name,
        email : user.email
    }

    req.session.user = loggedUser;
    res.redirect("/")
}

module.exports = {
    login
}