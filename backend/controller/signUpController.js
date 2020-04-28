require('dotenv').config();
const users = require("../models/user")
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWS_Secret_Access_Key,
    accessKeyId: process.env.AWS_Access_Key_ID,
    region: process.env.AWS_region,
});

const s3 = new aws.S3();

async function signup(req,res){

    const {name,email,password,gender,dob,phone,city,state,country,type} = req.body;
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
        type
    });
    // console.log(user);
    const params = {
        Bucket: "tvastra-users-dp",
        Key: email+"."+req.file.mimetype.split("/")[1],
        ACL: 'public-read',
        Body: req.file.buffer
    };
  
    try {
        const newUser = await user.save()
        const uploadDp = await s3.upload(params).promise()
        s3.upload(params, async function (err, data) {
            if (err) {
                console.log("Error: ", err);
            } else {
                const url = await users.findOneAndUpdate({email : email} , {dp : data.Location})
                res.redirect("/login")
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