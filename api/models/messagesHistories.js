"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageHistoryModel = new Schema({
    description: String,
    typeMessage: String,
    date: String,
    goals: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'goal'
    }
});

module.exports = mongoose.model('Message', MessageHistoryModel);