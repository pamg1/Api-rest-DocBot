"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParaclinicalModel = new Schema({
    date: String,
    type: String,
    value: String,
    comment:String,
    file: String
});

module.exports = mongoose.model('Paraclinical', ParaclinicalModel);