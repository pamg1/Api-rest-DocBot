"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicalInfoModel = new Schema({
    clinicalContext: String,
    testFindRisk:String,
    medicalCenter: String,
    eps: String,
    isDiabetic: Boolean,
    patient: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient'
    }/*,
    goals:  { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'goals'
    },
    goalsHistories: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'goalshistories'
    },
    paclinicals: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'paraclinicals'
    },
    appointments: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'appoinments'
    }*/
});

module.exports = mongoose.model('MedicalInfo', MedicalInfoModel);