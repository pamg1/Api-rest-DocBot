"use strict";

const MessageD = require("../models/messagesD");
//Muestra todos los mensajes guardados en la bd
exports.all = (req, res, next) => {
            MessageD.find()
            .then( messages => {
                res.json(messages);
            })
            .catch( err => {
                next(new Error(err));
            });
};
//Recibe un JSON con toda la info del mensaje y lo guarda en la bd
exports.post = (req, res, next) => {
    const message = req.body;
    new MessageHistory(message).save(err=>{
       console.log(err);
    });
    res.json(message);
    
};
//Recibe un el id del doctor, devuelve JSONs con las mensajes asociados a este
exports.findmessagesbydoc = (req, res, next) => { 
    const user2 = req.headers;
    const doctor= user2['doctor'];
    MessageD.find({ 'doctor': doctor })
    .then( messages => {
        res.json(messages);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};
//Recibe el id del paciente, devuelve JSONs con las mensajes del doctor asociados a este
exports.findmessagesbypat = (req, res, next) => { 
    const user2 = req.headers;
    const patient= user2['patient'];
    MessageD.find({ 'patient': patient })
    .then( messages => {
        res.json(messages);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};