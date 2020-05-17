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
    // console.log(doc)
    res.send(doc)
}

//schedule appointment page
const getAllSlots = async (req,res) => {
    const email = req.session.user.id;
    const slots= await Slot.find({user : email});
    res.send(slots)
}


const getDoctorSlots = async(req,res) => {
    const id = req.params.id;
    const date = new Date();
    const day = date.getDay();
    const slots = await Slot.find({user : id,  day : { $gte : day} } ).sort({day : 1})
    res.send(slots)
}

//doctors page get all slots of a particular day
const getAllSlotsOfDay = async (req,res) => {
    const id = req.query.id;
    const day = req.query.day;
    const slots = await Slot.find({user : id, day : day})
    res.send(slots)
}

module.exports = {
    doctor,
    getAllSlots,
    getDoctorSlots,
    getAllSlotsOfDay
}