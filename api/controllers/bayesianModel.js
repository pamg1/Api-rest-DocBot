"use strict";

const BayesianModel = require("./../models/bayesianModel");
//Muestra todos los modelos bayesianos guardados en la bd
exports.all = (req, res, next) => {
            BayesianModel.find()
            .then( bayesianModels => {
                res.json(bayesianModels);
            })
            .catch( err => {
                next(new Error(err));
            });
};
//Recibe un JSON con toda la info del modelo bayesiano y lo guarda en la bd
exports.post = (req, res, next) => {
    const bayesianModel = req.body;
    new BayesianModel(bayesianModel).save(err=>{
       console.log(err);
    });
    res.json(bayesianModel);
    
};
//Recibe un JSON con el id del paciente, devuelve JSONs con los modelos bayesianos asociados a este
exports.findbayesianModel = (req, res, next) => { 
    const user2 = req.body;
    const patient = user2["patient"];
    BayesianModel.find({ 'patient': patient })
    .then( bayesianModels => {
        res.json(bayesianModels);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};