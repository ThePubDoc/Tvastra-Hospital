function index(req,res){
    res.render("index")
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
        res.render("login");
    }
}

function logout(req,res){
    req.session.destroy();
    res.redirect("/");
}

function OTPLogin(req,res){
    res.render("otpLogin")
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