"use strict";

const Answer = require("./../models/answers");
//Muestra todos las respuestas guardadas en la bd
exports.all = (req, res, next) => {
            Answer.find()
            .then( answers => {
                res.json(answers);
            })
            .catch( err => {
                next(new Error(err));
            });
};
//Recibe un JSON con toda la info de la respuesta y la guarda en la bd
exports.post = (req, res, next) => {
    const answer = req.body;
    new Answer(answer).save(err=>{
       console.log(err);
    });
    res.json(answer);
    
};
//Recibe un JSON con el id de la meta, devuelve JSONs con las respuestas asociados a este
exports.findanswer = (req, res, next) => { 
    const user2 = req.body;
    const goal= user2["goal"];
    Answer.find({ 'goal': goal })
    .then( answers => {
        res.json(answers);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};