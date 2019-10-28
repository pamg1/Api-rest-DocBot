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
    console.log(medicalInfo);
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
        if(user == null){
            res.json({"status" : "El paciente no ha realizado el test"})
        }else{
            console.log(user.testFindRisk);
            res.json({"testFindRisk" : user.testFindRisk})
        }
    });
};
//Recibe un JSON con el id del paciente, devuelve JSONs con la info medica asociada a este
exports.findmedicalinfo = (req, res, next) => { 
    const user2 = req.headers;
    const patient= user2['patient'];
    MedicalInfo.findOne({ 'patient': patient },['clinicalContext', 'testFindRisk', 'medicalCenter',
        'isDiabetic'], function(err, med){
        if(med == null){
            res.json({"medicalinfo": "not found"})
        }else{
            res.json({
                "_id": med.id,
                "clinicalContext": med.clinicalContext,
                "testFindRisk": med.testFindRisk,
                "medicalCenter": med.medicalCenter,
                "isDiabetic": med.isDiabetic
            });
        }

    });
  
};
//Recibe un JSON con el id del paciente, devuelve JSONs con la info medica asociada a este
exports.put = (req, res, next) => { 
    const user2 = req.body;
    const id= user2["_id"];
    MedicalInfo.updateOne({ '_id': id },{'isDiabetic': id['isDiabetic'], 'testFindRisk': id['testFindRisk']})
    .then( medicalInfos => {
        res.json(medicalInfos);
    })
    .catch( err => {
        ext(new Error(err));n
    });
  
};