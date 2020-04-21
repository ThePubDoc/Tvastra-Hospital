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

function changePassword(req,res){
    const email = req.session.email;
    const user = users.findOne({email : email});
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    if(password1 != password2){
        res.render("updatePassword", {
            msg : "Password doesn't match",
            type : "failure",
        })
    }
    else{
        users.findOneAndUpdate( {email : email} ,{password : password1} , (err,result) => {
            if(err){
                console.log(err)
                res.render("updatePassword", {
                    msg : err,
                    type : "info"
                })
            }
            else {
                res.redirect("/")
            }
        });
        
    }
}

module.exports = {
    signup,
    changePassword,
}