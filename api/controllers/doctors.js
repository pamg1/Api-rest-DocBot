"use strict";

const Doctors = require("../models/doctors");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
//const jwt = require('jsonwebtoken');
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

exports.sendEmail = (req) => {
    const doctor = req.body;
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
        to: doctor["email"], // list of receivers
        subject: 'Bienvenido a DocBot', // Subject line
        html: '<h2>Bienvenido a DocBot!</h2><p>'+doctor["name"]+', su cuenta ha sido creada exitosamente<br/><b>Nombre de usuario: </b>'+doctor["email"]+'<br/><b>Contraseña: </b>'+doctor["password"]+'</p>'// plain text body
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
