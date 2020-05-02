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

router.route("/").get(admiController.index)

module.exports = router;