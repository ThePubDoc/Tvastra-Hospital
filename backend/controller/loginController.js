const Usres = require('../models/user');


async function login(req,res){
    // console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    const user = await Usres.find({email : email});
    console.log(user)
    if(user.length === 0){
        console.log("no user found")
        const msg = "No User Found";
        const type = "info"
        res.render("login" , {
            msg : msg,
            type : type
        })
    }
    else if(user[0].password !== password){
        const msg = "Password is wrong";
        const type = "failure";
        // console.log(msg)
        // console.log(password+" "+ user[0].password)
        res.render("login" , {
            msg : msg,
            type : type
        })
    }
    else{
        const loggedUser = {
            id : user._id,
            name : user.name,
            email : user.email
        }
        req.session.user = loggedUser;
        res.redirect("/")
    }
}

module.exports = {
    login
}