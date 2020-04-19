const express = require('express');

const mainController = require('../controller/mainController');
const singupController = require('../controller/signUpController');
const loginController = require('../controller/loginController');
const OTPController = require("../controller/otp")
const middle = require("../controller/middle");
const router = express.Router();
const app = express();

router.route('/').get(middle.checkLogin, mainController.index)
router.route('/doctor').get(middle.checkLogin, mainController.doctor)
router.route('/hospital').get(middle.checkLogin, mainController.hospital)
router.route('/signup').get(mainController.signup)
router.route('/login').get(mainController.login);
router.route('/logout').get(mainController.logout);

router.route('/signup').post(singupController.signup);
router.route('/getOTP').post(OTPController.getOTP);
router.route('/login').post(loginController.login);
module.exports = router;