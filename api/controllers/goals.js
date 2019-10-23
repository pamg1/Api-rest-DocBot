"use strict";

const Goal = require("./../models/goals");
const fetch = require('node-fetch');
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
//actualizar datos de la meta
exports.putpat = (req, res, next) => {
    const updates = req.body;
    const id = updates["id"];
    console.log(updates);
    Goal.updateOne({ '_id': id }, {'progress': updates["progress"],
     'state':updates["state"], 'nMessages': updates["nMessages"],
     'complianceDate': updates["complianceDate"]}, function (err, patient) {
        if(err){
            console.log(err);
        }
    });
    res.json({"update": "OK"});
};

exports.legomessages= (req, res, next)=>{

    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.json()) // expecting a json response
    .then(json => {
        console.log(json.id);
        console.log(json.title);
    })
    .catch(err => {
        console.log(err);
    });


}