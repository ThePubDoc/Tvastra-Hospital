require('dotenv').config();
const Nexmo = require('nexmo');
    
const nexmo = new Nexmo({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
});

function getOTP(req,res){
    console.log(req.body)
    let phoneNumber = req.body.phone;
    let message = "Tvastra";
      
    // console.log(phoneNumber);
    nexmo.verify.request({number: phoneNumber, brand: message}, (err, result) => {
      if(err) {
        res.render('status', {message: 'Server Error'});
      } else {
        console.log(result);
        let requestId = result.request_id;
        if(result.status == '0') {
          res.render('verify', {requestId: requestId});
        } else {
          //res.status(401).send(result.error_text);
          res.render('status', {message: result.error_text, requestId: requestId});
        }
      }
    });
}
module.exports = {

    getOTP
}