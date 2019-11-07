"use strict";

const mongoose = require("mongoose");
var moment = require('moment');
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
        default: moment(new Date()).format('MM DD YYYY h:mm:ss a')
    }
});

module.exports = mongoose.model('Paraclinical', ParaclinicalModel);