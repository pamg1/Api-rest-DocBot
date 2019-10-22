"use strict";

const MedicalInfo = require("./../models/medicalInfos");
//Muestra todos las informaciones medicas guardados en la bd
exports.all = (req, res, next) => {
            MedicalInfo.find()
            .then( medicalInfos => {
                res.json(medicalInfos);
            })
            .catch( err => {
                next(new Error(err));
            });
};
//Recibe un JSON con toda la info de la y lo guarda en la bd
exports.post = (req, res, next) => {
    const medicalInfo = req.body;
    new MedicalInfo(medicalInfo).save(err=>{
       console.log(err);
    });
    res.json(medicalInfo);
    
};
//Recibe un JSON con el id del paciente, devuelve JSONs con la info medica asociada a este
exports.findTestFR = (req, res, next) => { 
    const user2 = req.headers;
    const patient= user2["patient"];
    MedicalInfo.findOne({ 'patient': patient },['testFindRisk'],function (err, user){
        res.json({"testfindRisk" : user.testfindRisk})
    });
};
//Recibe un JSON con el id del paciente, devuelve JSONs con la info medica asociada a este
exports.findmedicalinfo = (req, res, next) => { 
    const user2 = req.body;
    const patient= user2["patient"];
    MedicalInfo.find({ 'patient': patient })
    .then( goals => {
        res.json(goals);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};