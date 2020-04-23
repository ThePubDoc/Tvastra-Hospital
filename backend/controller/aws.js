require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWS_Secret_Access_Key,
    accessKeyId: process.env.AWS_Access_Key_ID,
    region: process.env.AWS_region,
});

const s3 = new aws.S3();


async function uploadUserDp(req,res){
    // console.log("____",req.body)
    // const folder = (req.user.username + "/");
    console.log(req.file)
    console.log(req.file.mimetype.split("/")[1])
    const params = {
      Bucket: "tvastra-users-dp",
      Key: req.file.originalname,
      ACL: 'public-read',
      Body: req.file.buffer
    };

    // console.log(await s3.upload(params).promise())
    s3.upload(params, function (err, data) {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log(data);
      }
    });
}

module.exports = {
    uploadUserDp
}