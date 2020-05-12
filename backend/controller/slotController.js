const Users = require('../models/user');
const Slot = require("../models/slot");

const addSlot = async (req,res) => {
    let slot = new Slot(req.body);
    slot.user = req.session.user.email;
    let sTime = strToMins(slot.start_time);
    let eTimme = strToMins(slot.end_time);
    let totalTime = eTimme-sTime;
    let totalSlots = totalTime/(slot.interval);
    totalSlots = parseInt(totalSlots,10)
    var slots = [];
    for(let i=0;i<totalSlots;i++){
        slots.push({
            s_time : minsToStr(sTime),
            e_time : minsToStr(sTime + slot.interval)
        })
        sTime = sTime + slot.interval;
    }
    slot.subSlots = slots;
    const newSlot = new Slot(slot);
    const addedSlot = await newSlot.save();
    res.redirect('/doctor')
}

const strToMins = (t) =>  {
    var s = t.split(":");
    return Number(s[0]) * 60 + Number(s[1]);
  }
  
const minsToStr = (t) => {
    return Math.trunc(t / 60)+':'+('00' + t % 60).slice(-2);
}

module.exports = {
    addSlot,
}