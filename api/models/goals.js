"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalModel = new Schema({
    description: String,
    state: String,
    creationDate: String,
    quantity:String,
    typeFrequency: String,
    frequency: String,
    intensityLevel: String,
    typeMessage: String,
    pat: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient'
    }
});

module.exports = mongoose.model('Goal', GoalModel);