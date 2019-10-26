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
        date: Date
    }],
    height: String,
    email: String,
    password: String,
    dateAssociation: { 
        type: Date,
        default: Date.now
    },
    doc: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor'
    },
    avatar: String,
    img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Patient', PatientModel);