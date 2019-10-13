"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentModel = new Schema({
    comment: String,
    date: String,
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'patient'
    }
});

module.exports = mongoose.model('Appointment', AppointmentModel);