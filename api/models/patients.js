"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientModel = new Schema({
    name: String,
    lastName: String,
    birthdate: String,
    documentType: String,
    documentNumber: String,
    weight: String,
    height: String,
    sex: String,
    password: String,
    clinicalContext: String,
    dateAssociation: { 
        type: Date,
        default: Date.now
    },
    medicalCenter: String
});

module.exports = mongoose.model('Patient', PatientModel);