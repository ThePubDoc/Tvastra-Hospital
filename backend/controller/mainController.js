function index(req,res){
    req.session.count++;
    if(req.session.count === 2){
        res.render("index" , {
            msg : "Successful Login",
            type : "success"
        })
    }
    else{
        res.render("index" , {
            msg : "",
            type : ""
        })
    }
}

function doctor(req,res){
    res.render("doctor")
}

function hospital(req,res){
    res.render("hospital")
}

function signup(req,res){
    if(req.session.user){
        res.redirect("/")
    }
    else{
        res.render("signUp" , {
            err_msg:"",
            type:"",
        });
    }
}

function login(req,res){
    if(req.session.user){
        res.redirect("/")
    }
    else{
        res.render("login" , {
            msg : "",
            type : ""
        });
    }
}

function logout(req,res){
    req.session.destroy();
    res.redirect("/");
}

function OTPLogin(req,res){
    if(req.session.user){
        res.redirect("/")
    }
    else{
        res.render("otpLogin" , {
            msg : "",
            type : ""
        });
    }
}

function status(req,res){
    res.render("status")
}

function verify(req,res){
    res.render("verify")
}

function forgot(req,res){
    res.render("forgot")
}

module.exports = {
    index,
    doctor,
    hospital,
    signup,
    login,
    logout,
    OTPLogin,
    status,
    verify,
    forgot,
}