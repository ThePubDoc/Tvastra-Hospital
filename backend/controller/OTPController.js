require('dotenv').config();
const Nexmo = require('nexmo');
const Users = require("../models/user");

const nexmo = new Nexmo({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
});

async function getOTP(req,res){
  // console.log(req.body)
  let phoneNumber = req.body.phone;
  const user = await Users.findOne({phone : phoneNumber});
  // console.log(user)
  let message = "Tvastra";
  
  if(user){
    req.session.phone = phoneNumber;
    nexmo.verify.request({
      number : "+91"+phoneNumber,
      brand: message,
      code_length: '4',
      workflow_id: '6',
    }, (err, result) => {
      if(err) {
        // console.log("error in get otp function",err)
        res.render('otpLogin', {
          msg : "Server Error",
          type : "info"
        });
      } else {
        // console.log("result in get otp function",result);
        let requestId = result.request_id;
        req.session.request_id = result.request_id;
        if(result.status == '0') {
          res.render('verifyOTP');
        } else {
          //res.status(401).send(result.error_text);
          res.render('otpLogin', {
            msg : result.error_text,
            type : "info"
          });
        }
      }
    });
  }
  else{
    res.render("otpLogin", {
      msg : "No user found",
      type : "info"
    });
  }
}


async function verify(req,res){
  const otp = req.body.otp;
  const request_id = req.session.request_id;
  // console.log("request id:",request_id)
  // console.log(otp);
  const user = await Users.findOne({phone : req.session.phone})
  nexmo.verify.check({
    request_id : request_id,
    code : otp
  }, (err,result) => {
    if(err){
      res.render('status', {message: 'Server Error'});
    }
    else{
      if(result.status === '0'){
        req.session.user = user;
        req.session.count = 1;
        res.redirect("/");
      }
      else{
        // console.log("---",err)
        res.render("verifyOTP" , {
          msg : "Invalid OTP",
          type : "failure"
        })
      }
    }
  })
}

async function forgotOTP(req,res){
  // console.log(req.body)
  let email = req.body.email;
  const user = await Users.findOne({email : email});
  // console.log(user)
  let message = "Tvastra";
  
  if(user){
    req.session.phone = user.phone;
    nexmo.verify.request({
      number : "+91"+user.phone,
      brand: message,
      code_length: '4',
      workflow_id: '6',
    }, (err, result) => {
      if(err) {
        console.log("error in get otp function",err)
        res.render('forgot', {
          msg : "Server Error",
          type : "info"
        });
      } else {
        console.log("result in get otp function",result);
        let requestId = result.request_id;
        req.session.request_id = result.request_id;
        if(result.status == '0') {
          res.render('verifyForgotOTP', {
            msg : "",
            type : ""
          });
        } else {
          //res.status(401).send(result.error_text);
          res.render('forgot', {
            msg : result.error_text, 
            type : "info"
          });
        }
      }
    });
  }
  else{
    res.render("forgot", {
      msg :"No user found",
      type : "info"
    });
  }
}

async function verifyForgot(req,res){
  const otp = req.body.otp;
  const request_id = req.session.request_id;
  // console.log("request id:",request_id)
  // console.log(otp);
  const user = await Users.findOne({phone : req.session.phone})
  nexmo.verify.check({
    request_id : request_id,
    code : otp
  }, (err,result) => {
    if(err){
      res.render('status', {message: 'Server Error'});
    }
    else{
      if(result.status === '0'){
        req.session.email = user.email;
        res.render("updatePassword" , {
          msg: "",
          type : ""
        })
      }
      else{
        console.log("---",err)
        res.render("verifyForgotOTP" , {
          msg : "Invalid OTP",
          type : "failure"
        })
      }
    }
  })
}

module.exports = {
    getOTP,
    verify,
    forgotOTP,
    verifyForgot
}