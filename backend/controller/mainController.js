const success = {
    msg : "Successful Login",
    type : "success"
}

const empty = {
    msg : "",
    type : ""
}


function index(req,res){
    req.session.count++;
    if(req.session.count === 2){
        res.render("index" , success)
    }
    else{
        res.render("index" , empty)
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
        res.render("signUp" , empty);
    }
}

function login(req,res){
    if(req.session.user){
        res.redirect("/")
    }
    else{
        res.render("login" , empty);
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
        res.render("otpLogin" , empty);
    }
}

function status(req,res){
    res.render("status")
}

function verify(req,res){
    res.render("verify")
}

function forgot(req,res){
    res.render("forgot" , empty)
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