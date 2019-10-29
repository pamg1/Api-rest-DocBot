"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageModel = new Schema({
    description: String,
    typeMessage: String,//Amable - asertivo
    classMessage: String, //GenericoInicio- GenericoFinal 
    isQorA: String, // Pregunta - RespuestaPositiva - RespuestaNegativa
    goals: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'goal'
    }
});

module.exports = mongoose.model('Message', MessageModel);