"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalpModel = new Schema({
    description: String
});

module.exports = mongoose.model('Goalp', GoalpModel);