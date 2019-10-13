"use strict";

const Appointment = require("./../models/appointments");
//Muestra todos las metas guardados en la bd
exports.all = (req, res, next) => {
            Appointment.find()
            .then( appointments => {
                res.json(appointments);
            })
            .catch( err => {
                next(new Error(err));
            });
};
//Recibe un JSON con toda la info de la cita y lo guarda en la bd
exports.post = (req, res, next) => {
    const appointment = req.body;
    new Appointment(appointment).save(err=>{
       console.log(err);
    });
    res.json(appointment);
    
};
//Recibe un JSON con el id del paciente, devuelve JSONs con las citas asociados a este
exports.findappointment= (req, res, next) => { 
    const user2 = req.body;
    const patient= user2["patient"];
    Appointment.find({ 'patient': patient })
    .then( appointments => {
        res.json(appointments);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};