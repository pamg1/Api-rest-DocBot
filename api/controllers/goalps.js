"use strict";

const Goalp = require("../models/goalps");
//Muestra todos las metas guardados en la bd
exports.all = (req, res, next) => {
            Goalp.find()
            .then( goals => {
                res.json(goals);
            })
            .catch( err => {
                next(new Error(err));
            });
};
//Recibe un JSON con toda la info de la meta y lo guarda en la bd
exports.post = (req, res, next) => {
    const goal = req.body;
    new Goalp(goal).save(err=>{
       console.log(err);
    });
    res.json(goal);
    
};
/*
//Recibe un JSON con el id del paciente, devuelve JSONs con las metas asociados a este
exports.findgoalsHistories = (req, res, next) => { 
    const user2 = req.body;
    const patient= user2["patient"];
    Goalp.find({ 'patient': patient })
    .then( goals => {
        res.json(goals);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};*/