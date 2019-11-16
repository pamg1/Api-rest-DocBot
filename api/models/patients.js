"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientModel = new Schema({
    name: String,
    lastName: String,
    birthdate: String,
    age:String,
    documentType: String,
    documentNumber: String,
    sex: String,
    email: String,
    password: String,
    dateAssociation: String,
    avatar: String,
    steps: String,
    civilStatus: String,
    socioeconomic: String,
    educationLevel: String,
    smoking: Boolean,
    doc: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor'
    }
});

module.exports = mongoose.model('Patient', PatientModel);