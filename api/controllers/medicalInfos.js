"use strict";

const MedicalInfo = require("./../models/medicalInfos");
/**
 * Muestra todos las informaciones medicas guardados en la bd
 */
exports.all = (req, res, next) => {
            MedicalInfo.find()
            .then( medicalInfos => {
                res.json(medicalInfos);
            })
            .catch( err => {
                next(new Error(err));
            });
};
/**
 * Recibe un JSON con toda la info de la y lo guarda en la bd
 */
exports.post = (req, res, next) => {
    const medicalInfo = req.body;
    medicalInfo["weight"] = {'value': medicalInfo["weight"], 'date': medicalInfo["date"] };
    console.log(medicalInfo);
    new MedicalInfo(medicalInfo).save(err=>{
       console.log(err);
    });
    res.json(medicalInfo);
    
};
/**
 * Recibe un JSON con el id del paciente, devuelve JSONs con la info medica asociada a este
 */
exports.findTestFR = (req, res, next) => { 
    const user2 = req.headers;
    const patient= user2['patient'];
    console.log(patient);
    MedicalInfo.findOne({ 'patient': patient },['testFindRisk'],function (err, user){
        if(user == null){
            res.json({"status" : "El paciente no ha realizado el test"})
        }else{
            console.log(user.testFindRisk);
            res.json({"testFindRisk" : user.testFindRisk})
        }
    });
};
/**
 * Recibe el id del paciente, devuelve JSON con la info medica asociada a este
 */
exports.findmedicalinfo = (req, res, next) => { 
    const user2 = req.headers;
    const patient= user2['patient'];
    console.log("patient: "+ patient);
    MedicalInfo.findOne({ 'patient': patient },['clinicalContext', 'testFindRisk', 'medicalCenter',
        'isDiabetic','weight', 'height','imc','abdominalperimeter'], function(err, med){
        if(med == null){
            res.json({"medicalinfo": "not found"})
        }else{
            res.json({
                "_id": med.id,
                "clinicalContext": med.clinicalContext,
                "testFindRisk": med.testFindRisk,
                "medicalCenter": med.medicalCenter,
                "isDiabetic": med.isDiabetic,
                "weight": med.weight, 
                "height": med.height,
                "imc": med.imc,
                "abdominalperimeter": med.abdominalperimeter
            });
        }

    });
  
};
/**
 * Recibe un JSON con los datos a actualizar
 */
exports.put = (req, res, next) => { 
    const user2 = req.body;
    const id= user2["patient"];
    console.log(user2);
    MedicalInfo.updateOne({ 'patient': id },{'isDiabetic': id['isDiabetic'], 'testFindRisk': id['testFindRisk'], 'height': id['height'],
    'imc': id['imc']})
    .then( medicalInfos => {
        res.json(medicalInfos);
    })
    .catch( err => {
        ext(new Error(err));n
    });
  
};
/**
 * Actualizar datos del paciente
 */
exports.putweight = (req, res, next) => {
    const updates = req.body;
    const id = updates["id"];
    console.log(updates);
    const daatee= updates["date"];
    MedicalInfo.updateOne({ 'patient': id }, {$push:{'weight':{'value': updates["weight"],'date': daatee}}}, function (err, patient) {
        if(err){
            console.log(err);
        }
        console.log(patient)
    });
    res.json({"update": "OK"});
};
/**
 * Recibe un JSON con el id del doctor, devuelve JSONs con los pacientes asociados a este
 */
exports.getWeight = (req, res, next) => { 
    const user2 = req.headers;
    const id= user2["id"];
    MedicalInfo.findOne({ 'patient': id },['weight'],function (err, user) {
        if(user==null){
            res.json({"weight":"no asociado a paciente"});
        }else{
            res.json({"weight":user.weight});
        }
    });
};
/**
 * Exportar datos de los pacientes selecionados
 */
exports.exportData = (req,res,next) =>{
    const headrs = req.body;
    const ids = headrs['ids'];
    var medicalsinfos;
    console.log(ids);
    console.log(ids[0]);
    console.log(ids[0].id);
    for (var i in ids){
        MedicalInfo.findOne({'patient': ids[i].id},['patient', 'clinicalContext', 'testFindRisk','medicalCenter','isDiabetic',
        'abdominalperimeter','imc','height','weight'], function(err, infom){
            if(user == null ){

            }else{
                console.log(infom);
                console.log(medicalsinfos);
                medicalsinfos.push(infom);
            }    
        });
    }
    res.json(medicalsinfos);
}