"use strict";

const Doctors = require("../models/doctors");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
//const jwt = require('jsonwebtoken');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'docbotadmon@gmail.com',
           pass: 'f5J~w5Q]=1JDj'
    }
});

exports.all = (req, res, next) => {
        Doctors.find()
            .then( doctors => {
                res.json(doctors);
            })
            .catch( err => {
                next(new Error(err));
            });
};

exports.post = (req, res, next) => {
    const doctors = req.body;
    const saltRounds = 10;
    exports.sendEmail(req);
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(doctors["password"], salt, function(err, hash) {
            doctors["password"] = hash;
            new Doctors(doctors).save(err=>{
               console.log(err);
            });
            res.json(doctors);
     });
    });
};

exports.login = (req, res, next) => { 
    const user2 = req.body;
    const email = user2["email"];
    const password = user2["password"];
    Doctors.findOne({ 'email': email }, ['name','lastName','medicalCenter','password'] , function (err, user) {
        if(user==null){
            res.json({"login": false});
        }else{
            bcrypt.compare(password, user.password, function(err, resu) {
                if(resu==true){
                    res.json({"login" : true,
                    "id": user.id,
                    "name" : user.name,
                    "lastName" : user.lastName,
                    "medicalCenter" : user.medicalCenter
                });
                }else{
                    res.json({"login" : false})
                }
            });
        }
    });
};
// create reusable transporter object using the default SMTP transport
exports.codever = (req, res) => {
    const dooctor= req.headers;
    const email= dooctor['email'];
    var token = crypto.randomBytes(5).toString('hex');
    console.log(dooctor);
    console.log(token);
    Doctors.findOne({'email': email },['name','lastName', 'email'], function(err, doctor){
        if(doctor == null){
            res.json({"change": "no ok"});
        }else{
            exports.sendEmailToken(doctor, token);
            res.json({"token": token});
        }
    });
};

exports.putdoctor = (req, res) => {
    const updates = req.headers;
    const id = updates['id'];
    console.log(updates);
    Doctor.updateOne({ '_id': id }, {'name': updates["name"]}, function (err, doctor) {
        if(err){
            console.log("Error: "+ err);
        }
    });
    res.json({"update": "OK"});
}

exports.putpassword = (req, res) => {
    const updates = req.headers;
    const email = updates['email'];
    console.log(updates);
    var nw;
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(updates['newpassword'], salt, function(err,hash){
            nw = hash;
        });
    });
    Doctors.updateOne({ 'email': email }, {'password': nw}, function (err, doctor) {
        if(err){
            console.log("Error: "+ err);
        }
    });
    res.json({"update": "OK"});
}

exports.sendEmail = (req) => {
    const doctor = req.body;    
    const mailOptions = {
        from: 'docbotadmon@gmail.com', // sender address
        to: doctor["email"], // list of receivers
        subject: 'Bienvenido a DocBot', // Subject line
        html: '<h2>Bienvenido a DocBot!</h2><p>'+doctor["name"]+', su cuenta ha sido creada exitosamente<br/><br/><b>Nombre de usuario: </b>'+doctor["email"]+'<br/><b>Contraseña: </b>'+doctor["password"]+'<br/><br/>Cordialmente, <br/> <img src="https://raw.githubusercontent.com/rjuliao/Botic-Web/master/src/assets/logos/name-logo.jpeg?token=AK6NGAVIH5DHJMUJ4634W7C5ZRF2A" width="200" height="130"><br/> <i>"Sistema de acompañamiento para pacientes con<i><br/><i>Diabetes tipo 2 y síndrome metabólico"<i><br/><strong>Universidad del norte - 2019</strong></p>'// plain text body
    };
    console.log(doctor["email"]);
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    });
}

exports.sendEmailToken = (doctor, token) => {
    const mailOptions = {
        from: 'docbotadmon@gmail.com', // sender address
        to: doctor["email"], // list of receivers
        subject: 'Cambiar contraseña', // Subject line
        html: '<h2>Hola '+doctor["name"]+'!</h2><p> Recientemente se ha solicitado cambiar la contraseña para su cuenta DOCBOT. Para realizar el cambio de contraseña debe ingresar el siguiente código de verificación. <br/><br/><b>Código: </b>'+token+'<br/><br/>Si no ha sido usted, puede ignorar este correo. Su contraseña no cambiará a menos que usted cree una nueva.<br/><br/>Cordialmente, <br/> <img src="https://raw.githubusercontent.com/rjuliao/Botic-Web/master/src/assets/logos/name-logo.jpeg?token=AK6NGAVIH5DHJMUJ4634W7C5ZRF2A" width="200" height="130"><br/> <i>"Sistema de acompañamiento para pacientes con<i><br/><i>Diabetes tipo 2 y síndrome metabólico"<i><br/><strong>Universidad del norte - 2019</strong></p>'// plain text body
    };
    console.log(doctor["email"]);
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    });
}
/*
exports.validate = (req, res, next) => {
    const token = req.headers["token"];
    jwt.verify(token,  'secret', { algorithm: 'HS384'}, function(err, decoded) {
        if(err){
            res.send({"mensaje": err});
        }else{
            next();   
        }
    });
};
*/
