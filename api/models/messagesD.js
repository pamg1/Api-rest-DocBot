"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageDModel = new Schema({
    description: String,
    date: String,
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient'
    },
    doctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor'
    }
});

module.exports = mongoose.model('MessageD', MessageDModel);