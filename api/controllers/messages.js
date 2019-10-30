"use strict";

const Message = require("./../models/messages");
const fetch = require('node-fetch');
//Muestra todos los mensajes guardados en la bd
exports.all = (req, res, next) => {
            Message.find()
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
    new Message(message).save(err=>{
       console.log(err);
    });
    res.json(message);
    
};
//Recibe un JSON con el de la meta, devuelve JSONs con las metas asociados a este
exports.findmessages = (req, res, next) => { 
    const user2 = req.body;
    const goal= user2["goal"];
    Message.find({ 'goal': goal })
    .then( messages => {
        res.json(messages);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};
//
exports.legomessages= (req, res, next)=>{
    const header = req.headers;
    const patient = header['patient'];
    console.log(patient)
    fetch('http://modelobayesiano.herokuapp.com/getmessages/'+patient)
    .then(res => res.json()) // expecting a json response
    .then(json => {
        console.log(json);
        res.json(json);
    })
    .catch(err => {
        console.log(err);
    });
}