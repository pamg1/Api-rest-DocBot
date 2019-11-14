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
    weight: [{ 
        value: Number, 
        date: String
    }],
    height: String,
    email: String,
    password: String,
    dateAssociation: String,
    doc: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor'
    },
    avatar: String,
    steps: Number
});

module.exports = mongoose.model('Patient', PatientModel);