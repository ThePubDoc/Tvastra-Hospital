const Users = require('../models/user');


async function login(req,res){
   
    const email = req.body.email;
    const password = req.body.password;
    const user = await Users.findOne({email : email});
    console.log(user)
    if(user){
        if(user.password !== password){
            const msg = "Password is wrong";
            const type = "failure";
            
            res.render("login" , {
                msg : msg,
                type : type,
                user : ""
            })
        }
        else {
            const loggedUser = {
                id : user._id,
                name : user.name,
                email : user.email
            }
            
            req.session.user = loggedUser;
            req.session.count = 1;
            res.redirect("/")
        }
    }
    else {
        const msg = "No User Found";
        const type = "info"
        res.render("login" , {
            msg : msg,
            type : type,
            user : ""
        })
    }
}

module.exports = {
    login
}