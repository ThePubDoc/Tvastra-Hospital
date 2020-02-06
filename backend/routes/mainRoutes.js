const express = require('express');
const mainController = require('../controller/mainController');

const router = express.Router();
const app = express();

router.route('/').get(mainController.index)
router.route('/doctor').get(mainController.doctor)
router.route('/hospital').get(mainController.hospital)

module.exports = router;