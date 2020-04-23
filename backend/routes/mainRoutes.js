const express = require('express');
const multer = require("multer")

const mainController = require('../controller/mainController');
const singupController = require('../controller/signUpController');
const loginController = require('../controller/loginController');
const OTPController = require("../controller/OTPController")
const middle = require("../controller/middle");
const router = express.Router();
const app = express();



const storage = multer.memoryStorage();
const files = multer({ storage: storage });


router.route('/').get(middle.checkLogin, mainController.index)
router.route('/doctor').get(middle.checkLogin, mainController.doctor)
router.route('/hospital').get(middle.checkLogin, mainController.hospital)
router.route('/signup').get(mainController.signup)
router.route('/login').get(mainController.login);
router.route('/logout').get(mainController.logout);
router.route('/OTP-login').get(mainController.OTPLogin);
router.route('status').get(mainController.status);
router.route('/verify').get(mainController.verify);
router.route('/forgotPassword').get(mainController.forgot);


router.route('/signup').post(files.single("file"), singupController.signup);
router.route('/getOTP').post(OTPController.getOTP);
router.route('/login').post(loginController.login);
router.route('/verify').post(OTPController.verify);
router.route('/forgot').post(OTPController.forgotOTP);
router.route('/verifyForgotOTP').post(OTPController.verifyForgot);
router.route('/changePassword').post(singupController.changePassword);



const aws = require("../controller/aws")
router.route("/upload").get(mainController.upload)
router.route("/upload").post(files.single("file") , aws.uploadUserDp)
module.exports = router;