const User = require('../models/user');
const Slot = require('../models/slot');

const doctor = (req,res) => {
    const doctors = User.find({type : "Doctor"})
    console.log(doctor)
}


module.exports = {
    doctor,
}