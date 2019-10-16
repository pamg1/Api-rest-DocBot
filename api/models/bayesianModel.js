"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BayesianModel = new Schema({
    r: Number,
    s: Number,
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'patient'
    }
});

module.exports = mongoose.model('BayesianModel', BayesianModel);