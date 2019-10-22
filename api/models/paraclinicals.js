"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParaclinicalModel = new Schema({
    
    type: String,
    value: String,
    comment:String,
    file: String,
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient'
    },
    date: { 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Paraclinical', ParaclinicalModel);