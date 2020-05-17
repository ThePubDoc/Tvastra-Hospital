const express = require('express');
const multer = require("multer")

const mainController = require('../controller/mainController');
const singupController = require('../controller/signUpController');
const loginController = require('../controller/loginController');
const OTPController = require("../controller/OTPController")
const adminController = require("../controller/adminController");
const adminPostController = require("../controller/adminPostController");
const slotController = require('../controller/slotController');
const ajaxController = require('../controller/ajaxController');
const middle = require("../controller/middleware/middle");
const router = express.Router();

const storage = multer.memoryStorage();
const files = multer({ storage: storage });

router.route('/').get(middle.checkLogin, mainController.index)
router.route('/doctor').get(mainController.doctor)
router.route('/hospital').get(middle.checkLogin, mainController.hospital)
router.route('/signup').get(mainController.signup)
router.route('/login').get(mainController.login);
router.route('/logout').get(mainController.logout);
router.route('/OTP-login').get(mainController.OTPLogin);
router.route('status').get(mainController.status);
router.route('/verify').get(mainController.verify);
router.route('/forgotPassword').get(mainController.forgot);
router.route('/resend').get(OTPController.getOTP);
router.route('/addDoctor').get(mainController.addDoctor);
router.route('/addHospital').get(mainController.addHospital);
router.route('/tvastraPlus').get(mainController.tvastraPlus);
router.route('/scheduleAppointments').get(mainController.scheduleAppointments);
router.route('/getAllSlots').get(ajaxController.getAllSlots);
router.route('/slots/:id').get(ajaxController.getDoctorSlots)
router.route('/getAllSlotsOfDay').get(ajaxController.getAllSlotsOfDay);


router.route('/signup').post(files.single("file"), singupController.signup);
router.route('/getOTP').post(OTPController.getOTP);
router.route('/login').post(loginController.login);
router.route('/verify').post(OTPController.verify);
router.route('/forgot').post(OTPController.forgotOTP);
router.route('/verifyForgotOTP').post(OTPController.verifyForgot);
router.route('/changePassword').post(singupController.changePassword);
router.route('/addDoctor').post(singupController.addDoctor);
router.route('/addHospital').post(singupController.addHospital);
router.route('/addSlot').post(slotController.addSlot);
router.route('/getDoctor').post(ajaxController.doctor);


router.route('/admin').get(middle.checkLogin,adminController.index)
router.route('/admin/edit').get(adminController.edit)
router.route('/admin/edit/user/:id').get(adminController.editUser)


router.route('/admin/edit').post(adminPostController.edit);
router.route('/admin/edit/user/:id').post(adminPostController.editUser)
// const aws = require("../controller/aws")
// router.route("/upload").get(mainController.upload)
// router.route("/upload").post(files.single("file") , aws.uploadUserDp)
module.exports = router;