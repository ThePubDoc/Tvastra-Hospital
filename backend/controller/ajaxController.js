const User = require('../models/user');
const Slot = require('../models/slot');

const doctor = async (req,res) => {
    const filters = req.body;
    const locationFilters = filters.locationFilters;
    const treatmentFilters = filters.treatmentFilters;
    const hospitalFilters = filters.hospitalFilters;
    const experienceFilters = filters.experienceFilters;
    const locationQuery = { $ne : locationFilters};
    const doc = await User.find({
        type : "Doctor",
        city : locationFilters,
        // hospitals : { $all: hospitalFilters },
    })
    console.log(doc)
    res.send(doc)
}

const getAllSlots = async (req,res) => {
    // console.log(req.session.user);
    const email = req.session.user.email;
    const slots= await Slot.find({user : email});
    console.log(slots)
    res.send(slots)
}

module.exports = {
    doctor,
    getAllSlots
}