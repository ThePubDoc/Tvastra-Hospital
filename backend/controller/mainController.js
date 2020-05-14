const Users = require("../models/user");
const Hospitals = require("../models/hospital");



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
        res.render("index" , success)
    }
    else{
        empty.user = requireFields;
        res.render("index" , empty)
    }
}

const doctor = async (req,res) => {
    const doctors = await Users.find({type : "Doctor"})
    empty.doctors = doctors
    res.render("doctor" , empty,)
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

const scheduleAppointments = async (req,res) => {
    const requireFields = req.session.user;
    const hospitals = await Hospitals.find();
    
    success.user = requireFields;
    success.hospitals = hospitals
    res.render("scheduleAppointments", success);
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
    tvastraPlus,
    scheduleAppointments
}