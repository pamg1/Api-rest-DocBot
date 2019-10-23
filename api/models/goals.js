"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalModel = new Schema({
    description: String,
    state: String,
    creationDate: { 
        type: Date,
        default: Date.now
    },
    quantity:String,
    typeFrequency: String,
    frequency: String,
    intensityLevel: String,
    typeMessage: String,
    progress: String,
    dueDate: Date,
    complianceDate: String,
    tag: String,
    nMessages: String,
    pat: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient'
    }
});

module.exports = mongoose.model('Goal', GoalModel);