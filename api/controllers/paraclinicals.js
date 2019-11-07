"use strict";

const Paraclinical = require("./../models/paraclinicals");
const Patient = require("./../models/patients");
var excel = require('excel4node');
//Muestra todos los paraclinicos guardados en la bd
exports.doc = (req, res, next) => {
    // Create a new instance of a Workbook class
    var workbook = new excel.Workbook();
    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Sheet 1');
    // Create a reusable style
    var style = workbook.createStyle({
        font: {
        color: '#FF0800',
        size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });
    Paraclinical.find().then( paraclinicals => {
        worksheet.cell(1,1).string('Fecha').style(style);
        worksheet.cell(1,2).string('Tipo').style(style);
        worksheet.cell(1,3).string('Valor').style(style);
        worksheet.cell(1,4).string('Comentario').style(style);
        worksheet.cell(1,5).string('id_Paciente').style(style);
        for (var i = 0; i < paraclinicals.length; i++) {
            const paraclinical = paraclinicals[i];
            worksheet.cell(i,1).string(''+paraclinical["date"]).style(style);
            worksheet.cell(i,2).string(''+paraclinical["type"]).style(style);
            worksheet.cell(i,3).string(''+paraclinical["value"]).style(style);
            worksheet.cell(i,4).string(''+paraclinical["comment"]).style(style);
            worksheet.cell(i,5).string(''+paraclinical["patient"]).style(style);
        }
        workbook.write('Paclinicos.xlsx');
        res.json(paraclinicals);
    })
    .catch( err => {
        next(new Error(err));
    });
};

exports.all = (req, res, next) => {
    Paraclinical.find()
    .then( paraclinicals => {
        res.json(paraclinicals);
    })
    .catch( err => {
        next(new Error(err));
    });
};
//Recibe un JSON con toda la info del paraclinico y lo guarda en la bd
exports.post = (req, res, next) => {
    const paraclinical = req.body;
    new Paraclinical(paraclinical).save(err=>{
       console.log(err);
    });
    res.json(paraclinical);
    
};
//Recibe el id de un paciente, devuelve JSONs con los paraclinicos asociados a este
exports.findparaclinicals = (req, res, next) => { 
    const user2 = req.headers;
    const patient= user2['content-type'];
    Paraclinical.find({ 'patient': patient })
    .then( paraclinicals => {
        res.json(paraclinicals);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};
//Recibe el id de un paciente y el tipo de paraclinico, devuelve JSONs con los paraclinicos asociados a este
exports.findparaclinicalsbypandt = (req, res, next) => { 
    const user2 = req.body;
    const patient= user2['patient'];
    const type= user2['type'];
    Paraclinical.find({ 'patient': patient, 'type': type })
    .then( paraclinicals => {
        res.json(paraclinicals);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};