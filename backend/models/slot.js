const mongoose = require("mongoose")

const schema = mongoose.Schema;

const subSlotsSchema = new schema({
    s_time:{
        type: String,
        required: true
    },
    e_time:{
        type:String,
        required: true
    },
    isBooked:{
        type: Boolean,
        required: true,
        default: false
    },
    bookingDates:[{type: Date}],
    isDisabled:{
        type: Boolean,
        required: true,
        default: false
    },
    disableDays:[{type:String}]
});

const slotSchema = new schema({
    start_time: {type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    interval:{
        type: Number,
        required: true
    },
    day:[{
        type: String
    }],
    disableSlots:[{
        type: String
    }],
    hospital:{
        type: String,
        required: true
    },
    holiday:{
        type: Date
    },
    subSlots: [{type: subSlotsSchema}]
},{timestamps : true})

module.exports = slot = mongoose.model("slot", slotSchema);