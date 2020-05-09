const Users = require("../models/user");

const success = {
    msg : "Successful Login",
    type : "success",
    user : ""
}

const empty = {
    msg : "",
    type : "",
    user : ""
}


async function index(req,res){
    const user = await Users.findOne({email : req.session.user.email});
    const requireFields = {
        name : user.name,
        email : user.email,
        phone : user.phone,
        dp : user.dp,
    }
    req.session.count++;
    if(req.session.count === 2){
        success.user = requireFields;
        console.log(success)
        res.render("index" , success)
    }
    else{
        empty.user = requireFields;
        res.render("index" , empty)
    }
}

function doctor(req,res){
    res.render("doctor" , empty)
}

function hospital(req,res){
    res.render("hospital" ,empty)
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
    res.render("verify" , empty)
}

function forgot(req,res){
    res.render("forgot" , empty)
}

function upload(req,res){
    res.render("uploadtest")
}

const addDoctor = (req,res) => {
    res.render("addDoctor")
}

const addHospital = (req,res) => {
    res.render("addHospital")
};

const tvastraPlus = (req,res) => {
    res.render("tvastraPlan")
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
    upload,
    addDoctor,
    addHospital,
    tvastraPlus
}