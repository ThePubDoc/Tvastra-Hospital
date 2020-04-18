const users = require("../models/user")

function signup(req,res){
    // console.log(req.body);
    const {name,email,password,gender,dob,phone,city,state,country} = req.body;
    const user = new users({
        name,
        email,
        password,
        gender,
        dob,
        phone,
        city,
        state,
        country,
    });
    // console.log(user);
    user.save((err) => {
        if(err){
            // console.log(err)
            if(err.code === 11000 && Object.keys(err.keyPattern)[0] === "phone"){
                var err_msg = "Number already exists";
                res.render("signup", {
                    type:"phone",
                    err_msg
                })
            }
            if(err.code === 11000 && Object.keys(err.keyPattern)[0] === "email"){
                var err_msg = "Email already exists";
                res.render("signup", {
                    type:"email",
                    err_msg
                })
            }
        }
        else{
            res.redirect("/login")
        }
    });
}

module.exports = {
    signup : signup,
}