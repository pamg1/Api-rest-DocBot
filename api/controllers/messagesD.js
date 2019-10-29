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
    new MessageD(message).save(err=>{
       console.log(err);
    });
    res.json(message);
    
};
//Recibe un el id del doctor, devuelve JSONs con las mensajes asociados a este
exports.findmessagesbydoc = (req, res, next) => { 
    const user2 = req.headers;
    const doctor= user2['doctor'];
    const patient= user2['patient'];
    MessageD.find({ 'doctor': doctor, 'patient': patient })
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
//Recibe el id del mensaje y lo borra
exports.delete = (req, res, next) => {
    const message = req.body;
    const id = message["id"];
    MessageD.deleteOne({'_id': id}, function(err){
        console.log(err);
    });
    res.json({"delete": "ok"});

}