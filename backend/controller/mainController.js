const Users = require("../models/user");
const Hospitals = require("../models/hospital");
const Slot = require('../models/slot');


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


const index = async (req,res) => {
    const date = new Date();
    const day = date.getDay();
    const oldSlot = await Slot.deleteMany({day: {$lt : day}});
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
    const doctors = await Users.find({type : "Doctor"});
    let location = [];
    let treatment = [];
    let hospital = [];
    for(let i=0;i<doctors.length;i++){
        if(location.includes(doctors[i].city)==false){
            location.push(doctors[i].city);
        }
        
        for(let j=0;j<doctors[i].treatment.length;j++){
            if(treatment.includes(doctors[i].treatment[j])==false){
                treatment.push(doctors[i].treatment[j]);
            }
        }

        for(let j=0;j<doctors[i].hospitals.length;j++){
            if(hospital.includes(doctors[i].hospitals[j])==false){
                hospital.push(doctors[i].hospitals[j]);
            }
        }
    }
 
    empty.doctors = doctors
    empty.location = location;
    empty.treatment = treatment;
    empty.hospital = hospital;
    
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


const bookAppointment = (req,res) => {
    res.render("bookAppointment" , empty);
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
    scheduleAppointments,
    bookAppointment,
}