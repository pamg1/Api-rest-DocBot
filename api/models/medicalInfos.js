"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicalInfoModel = new Schema({
    weight: [],
    height: String,
    clinicalContext: String,
    testFindRisk:String,
    medicalCenter: String,
    eps: String/*,
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