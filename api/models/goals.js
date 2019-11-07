"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalModel = new Schema({
    description: String,
    state: String,
    creationDate: String, 
    quantity:String,
    frequency: String,
    intensityLevel: String,
    progress: String,
    dueDate: String,
    complianceDate: String,
    tag: String,
    nMessages: String,
    pat: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient'
    }
});

module.exports = mongoose.model('Goal', GoalModel);