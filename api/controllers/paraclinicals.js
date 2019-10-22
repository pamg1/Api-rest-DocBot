"use strict";

const Paraclinical = require("./../models/paraclinicals");
//Muestra todos los paraclinicos guardados en la bd
exports.all = (req, res, next) => {
            Paraclinical.find()
            .then( paraclinicals => {
                res.json(paraclinicals);
            })
            .catch( err => {
                next(new Error(err));
            });
};
//Recibe un JSON con toda la info del paraclinico y lo guarda en la bd
exports.post = (req, res, next) => {
    const paraclinical = req.body;
    new Paraclinical(paraclinical).save(err=>{
       console.log(err);
    });
    res.json(paraclinical);
    
};
//Recibe el id de un paciente, devuelve JSONs con los paraclinicos asociados a este
exports.findparaclinicals = (req, res, next) => { 
    const user2 = req.headers;
    const patient= user2['content-type'];
    Paraclinical.find({ 'patient': patient })
    .then( paraclinicals => {
        res.json(paraclinicals);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};