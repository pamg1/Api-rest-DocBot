"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorModel = new Schema({
    name: String,
    lastName: String,
    email: String,
    medicalCenter: String,
    password: String
});

module.exports = mongoose.model('Doctor', DoctorModel);