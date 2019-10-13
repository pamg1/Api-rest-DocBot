"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerModel = new Schema({
    description: String,
    date: String,
    goals: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'goal'
    }
});

module.exports = mongoose.model('Answer', AnswerModel);