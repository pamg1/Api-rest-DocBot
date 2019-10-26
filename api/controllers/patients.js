"use strict";

const Patient = require("./../models/patients");
const MedicalInfo = require("./../models/medicalInfos");
const Paraclinical = require("./../models/paraclinicals");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

//Muestra todos los pacientes guardados en la bd
exports.all = (req, res, next) => {
            Patient.find()
            .then( patients => {
                res.json(patients);
            })
            .catch( err => {
                next(new Error(err));
            });
};
//Recibe un JSON con toda la info del paciente y lo guarda en la bd
exports.post = (req, res, next) => {
    const patient = req.body;
    const saltRounds = 10;
    const w= req.headers;
    exports.sendEmail(req);
    const daatee= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    patient["weight"] = [{'value': patient["weight"],'date': daatee}];
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(patient["password"], salt, function(err, hash) {
            patient["password"] = hash;
            new Patient(patient).save(err=>{
               console.log(err);
            });
            res.json(patient);
     });
    });
};
//Recibe un JSON con el id del doctor, devuelve JSONs con los pacientes asociados a este
exports.findpatients = (req, res, next) => { 
    const user2 = req.body;
    const doctor= user2["doc"];
    Patient.find({ 'doc': doctor })
    .then( patients => {
        res.json(patients);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};
//login pacientes
exports.login = (req, res, next) => { 
    const user2 = req.body;
    const email = user2["documentNumber"];
    const password = user2["password"];
    Patient.findOne({ 'documentNumber': email }, ['name','lastName','age','weight','height','medicalCenter','password',
     'avatar', 'sex', 'email'] , function (err, user) {
        if(user==null){
            res.json({"login": false});
        }else{
            bcrypt.compare(password, user.password, function(err, resu) {
                if(resu==true){
                    res.json({"login" : true,
                    "id": user.id,
                    "name" : user.name,
                    "lastName" : user.lastName,
                    "age": user.age,
                    "weight":user.weight,
                    "height":user.height,
                    "medicalCenter" : user.medicalCenter,
                    "avatar": user.avatar,
                    "sex": user.sex,
                    "email": user.email
                });
                }else{
                    res.json({"login" : false})
                }
            });
        }
    });
  
};
//actualizar datos del paciente por el doctor
exports.put = (req, res, next) => {
    const updates = req.body;
    const id = updates["_id"];
    Patient.updateOne({ '_id': id }, {'name': updates["name"],
     'lastName':updates["lastName"], 'birthdate': updates["birthdate"],
     'documentType': updates["documentType"], 'documentNumber':updates["documentNumber"], 'age': updates["age"],
     'height':updates["height"], 'sex': updates["sex"],
     'medicalCenter': updates["medicalCenter"], 'email': updates["email"]}, function (err, patient) {
        if(err){
            console.log(err);
        }
    });
    res.json({"update": "OK"});
};
//actualizar datos del paciente por paciente
exports.putpat = (req, res, next) => {
    const updates = req.body;
    const id = updates["id"];
    console.log(updates);
    Patient.updateOne({ '_id': id }, {'name': updates["name"],
     'lastName':updates["lastName"], 'age': updates["age"],
     'height':updates["height"],'avatar':updates["avatar"]}, function (err, patient) {
        if(err){
            console.log("Error: "+err);
        }
    });
    res.json({"update": "OK"});
};
//actualizar datos del paciente
exports.putweight = (req, res, next) => {
    const updates = req.body;
    const id = updates["id"];
    console.log(updates);
    const daatee= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    console.log("fechas "+daatee);
    Patient.updateOne({ '_id': id }, {$push:{'weight':{'value': updates["weight"],'date': daatee}}}, function (err, patient) {
        if(err){
            console.log(err);
        }
        console.log(patient)
    });
    res.json({"update": "OK"});
};
//Recibe un JSON con el id del doctor, devuelve JSONs con los pacientes asociados a este
exports.getWeight = (req, res, next) => { 
    const user2 = req.headers;
    const id= user2["id"];
    Patient.findOne({ '_id': id },['weight'],function (err, user) {
        if(user==null){
            res.json({"weight":"no asociado a paciente"});
        }else{
            res.json({"weight":user.weight});
        }
    });
     
};
//Enviar correo con información
exports.sendEmail = (req) => {
    const patient = req.body;
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'docbotadmon@gmail.com',
               pass: 'f5J~w5Q]=1JDj'
        }
    });
    const mailOptions = {
        from: 'docbotadmon@gmail.com', // sender address
        to: patient["email"], // list of receivers
        subject: 'Bienvenido a DocBot', // Subject line
        html: '<h2>Bienvenido a DocBot!</h2><p>'+patient["name"]+', su cuenta ha sido creada exitosamente<br/><b>Nombre de usuario: </b>'+patient["documentNumber"]+'<br/><b>Contraseña: </b>'+patient["password"]+'<br/><br/></p>'// plain text body
    };
    console.log(patient["email"]);
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    });
};
//delete patient
exports.delete = (req, res, next) => {
    const patient = req.headers;
    const id= patient["id"];
    console.log(patient);
    console.log(id);
    MedicalInfo.deleteMany({'patient': id }, function (err) {
        if(err){
            console.log(err)
        }
    });
    Paraclinical.deleteMany({'patient': id }, function (err) {
        if(err){
            console.log(err)
        }
    });
    Patient.deleteOne({'_id': id }, function (err) {
        if(err){
            console.log(err)
        }
        res.json({"delete":"ok"});
    });
};

/*
exports.validate = (req, res, next) => {
    const token = req.headers["token"];
    jwt.verify(token, 'shhhhh', function(err, decoded) {
        if(err){
            res.json({"Error": err});
        }else{
            next();   
    }
    });
}*/



