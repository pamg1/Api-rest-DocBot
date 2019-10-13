"use strict";

const MessageHistory = require("./../models/messagesHistories");
//Muestra todos los mensajes guardados en la bd
exports.all = (req, res, next) => {
            MessageHistory.find()
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
//Recibe un JSON con el de la meta, devuelve JSONs con las metas asociados a este
exports.findmessages = (req, res, next) => { 
    const user2 = req.body;
    const goal= user2["goal"];
    MessageHistory.find({ 'goal': goal })
    .then( messages => {
        res.json(messages);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};