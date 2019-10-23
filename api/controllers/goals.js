"use strict";

const Goal = require("./../models/goals");
//Muestra todos las metas guardados en la bd
exports.all = (req, res, next) => {
            Goal.find()
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
    new Goal(goal).save(err=>{
       console.log(err);
    });
    res.json(goal);
    
};
//Recibe un JSON con el id del paciente, devuelve JSONs con las metas asociados a este
exports.findgoals = (req, res, next) => { 
    const user2 = req.body;
    const patient= user2["pat"];
    Goal.find({ 'pat': patient })
    .then( goals => {
        res.json(goals);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};

//actualizar datos del paciente
exports.put = (req, res, next) => {
    const updates = req.body;
    const id = updates["_id"];
    Patient.updateOne({ '_id': id }, {'progress': updates["progress"],
     'state':updates["state"], 'duedate': updates["duedate"],
     'complianceDate': updates["complianceDate"]}, function (err, patient) {
        if(err){
            console.log(err);
        }
    });
    res.json({"update": "OK"});
};