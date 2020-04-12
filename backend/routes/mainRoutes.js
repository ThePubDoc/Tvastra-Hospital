const express = require('express');

const mainController = require('../controller/mainController');
const singupController = require('../controller/signUpController');

const router = express.Router();
const app = express();

router.route('/').get(mainController.index)
router.route('/doctor').get(mainController.doctor)
router.route('/hospital').get(mainController.hospital)
router.route('/signup').get(mainController.signup)


router.route('/signup').post(singupController.signup);


module.exports = router;