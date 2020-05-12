require('dotenv').config();
const Users = require("../models/user");
const Hospitals = require("../models/hospital");

const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.AWS_Secret_Access_Key,
    accessKeyId: process.env.AWS_Access_Key_ID,
    region: process.env.AWS_region,
});

const s3 = new aws.S3();

async function signup(req,res){

    const {name,email,password,gender,dob,phone,city,state,country,type} = req.body;
    const user = new Users({
        name,
        email,
        password,
        gender,
        dob,
        phone,
        city,
        state,
        country,
        type
    });
    
    const params = {
        Bucket: "tvastra-users-dp",
        Key: email+"."+req.file.mimetype.split("/")[1],
        ACL: 'public-read',
        Body: req.file.buffer
    };
  
    try {
        // const uploadDp = await s3.upload(params).promise()
        s3.upload(params, async function (err, data) {
            if (err) {
                console.log("Error: ", err);
            } else {
                user.dp = data.Location;
                if(req.body.doctor === "on"){
                    req.session.body = req.body;
                    req.session.body.type= "Doctor";
                    user.type = "Doctor";
                    req.session.dp = data.Location;
                    console.log(user)
                    try {
                        const newDoctor = await user.save();
                        res.redirect("/addDoctor")
                    } catch(err) {
                        if(err.code === 11000 && Object.keys(err.keyPattern)[0] === "phone"){
                            var err_msg = "Number already exists";
                            res.render("signup", {
                                type:"phone",
                                err_msg,
                                user : ""
                            })
                        }
                        if(err.code === 11000 && Object.keys(err.keyPattern)[0] === "email"){
                            var err_msg = "Email already exists";
                            res.render("signup", {
                                type:"email",
                                err_msg,
                                user : ""
                            })
                        }
                    }
                }
                else{
                    const newUser = await user.save();
                    res.redirect("/login");
                }
            }
        });
    } catch(err){
        if(err.code === 11000 && Object.keys(err.keyPattern)[0] === "phone"){
            var err_msg = "Number already exists";
            res.render("signup", {
                type:"phone",
                err_msg,
                user : ""
            })
        }
        if(err.code === 11000 && Object.keys(err.keyPattern)[0] === "email"){
            var err_msg = "Email already exists";
            res.render("signup", {
                type:"email",
                err_msg,
                user : ""
            })
        }
    }
}

function changePassword(req,res){
    const email = req.session.email;
    const user = Users.findOne({email : email});
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    if(password1 != password2){
        res.render("updatePassword", {
            msg : "Password doesn't match",
            type : "failure",
        })
    }
    else{
        Users.findOneAndUpdate( {email : email} ,{password : password1} , (err,result) => {
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

const addDoctor = async (req,res) => {
    const doc =req.body;
    doc.speciality = req.body.speciality.split(",");
    doc.education = req.body.education.split(",");
    doc.treatment = req.body.treatment.split(",");
    doc.hospitals = req.body.hospitals.split(",");
    doc.achievements = req.body.achievements.split(",");
    doc.awards = req.body.awards.split(",");
    // const newDoc = new Users (req.body);
    // const newDoc = new Users({
    //     ...req.session.body,
    //     ...doc
    // })
    const email = req.session.body.email;
    console.log(doc)
    console.log(email)
    const saveDoc = await Users.findOneAndUpdate({email : email}, doc);
    res.redirect("/")
}

const addHospital = async (req,res) => {
    const hospital = new Hospitals(req.body);
    const newHospital = await hospital.save();
}
module.exports = {
    signup,
    changePassword,
    addDoctor,
    addHospital
}