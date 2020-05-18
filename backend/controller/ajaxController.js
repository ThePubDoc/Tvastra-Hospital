const User = require('../models/user');
const Slot = require('../models/slot');

const doctor = async (req,res) => {
    const filters = req.body;
    let locationFilters = filters.locationFilters;
    let treatmentFilters = filters.treatmentFilters;
    let hospitalFilters = filters.hospitalFilters;
    let experienceFiltersString = filters.experienceFilters;
    let experienceFilters = [];
    let minExperienceYear = 100;
    for(let i=0;i<experienceFiltersString.length;i++){
        experienceFilters.push(Number(experienceFiltersString[i]))
        if(experienceFilters[i]<minExperienceYear){
            minExperienceYear = experienceFilters[i];
        }
    }
    
    let location = [];
    let treatment = [];
    let hospital = [];
    const doctors = await User.find({type : "Doctor"});
    for(let i=0;i<doctors.length;i++){
        if(location.includes(doctors[i].city)==false){
            location.push(doctors[i].city);
        }
        
        for(let j=0;j<doctors[i].treatment.length;j++){
            if(treatment.includes(doctors[i].treatment[j])==false){
                treatment.push(doctors[i].treatment[j]);
            }
        }

        for(let j=0;j<doctors[i].hospitals.length;j++){
            if(hospital.includes(doctors[i].hospitals[j])==false){
                hospital.push(doctors[i].hospitals[j]);
            }
        }
    }
    if(locationFilters.length === 0){
        locationFilters = location
    }
    if(treatmentFilters.length === 0){
        treatmentFilters = treatment;
    }
    if(hospitalFilters.length === 0){
        hospitalFilters = hospital;
    }
    minExperienceYear = (minExperienceYear === 100) ? 0 : minExperienceYear;
    console.log(minExperienceYear)
    const filterdDoctors = await User.find({
        type : "Doctor",
        city : {
            $in : locationFilters
        },
        treatment : {
            $in : treatmentFilters
        },
        hospitals : {
            $in : hospitalFilters
        },
        experience : {
            $gte : minExperienceYear
        }
    })
    res.send(filterdDoctors)
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