"use strict";

const Patient = require("./../models/patients");
const MedicalInfo = require("./../models/medicalInfos");
const Goals = require("./../models/goals");
const Paraclinical = require("./../models/paraclinicals");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
var Excel = require('exceljs');

/**
 * Muestra todos los pacientes guardados en la bd
 */
exports.all = (req, res, next) => {
            Patient.find()
            .then( patients => {
                res.json(patients);
            })
            .catch( err => {
                next(new Error(err));
            });
};
/**
 * Recibe un JSON con toda la info del paciente y lo guarda en la bd
 */
exports.post = (req, res, next) => {
    const patient = req.body;
    const saltRounds = 10;
    exports.sendEmail(req);
    console.log(patient);
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(patient["password"], salt, function(err, hash) {
            patient["password"] = hash;
            new Patient(patient).save(err=>{
               console.log(err);
            });         
            res.json({"Post": "ok"});   
     });
    });
};
/**
 * Buscar pacientes segun número de documento 
 */
exports.findpatient= (req, res, next) => {
    const patient= req.headers;
    const dn= patient['documentnumber'];
    console.log(dn);
    Patient.findOne({'documentNumber':dn},['name'], function(err, user){
        console.log(user);
        if(user == null){
            res.json({"Patient": "not found"})
            console.log(err);
        }else{
            console.log({"id" : user._id , "name" : user.name});
            res.json({
                "id" : user.id,
                "name" : user.name
            });
        }
    });
};
/**
 * Recibe un JSON con el id del doctor, devuelve JSONs con los pacientes asociados a este
 */
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
/**
 * Login pacientes
 */
exports.login = (req, res, next) => { 
    const user2 = req.body;
    const email = user2["documentNumber"];
    const password = user2["password"];
    Patient.findOne({ 'documentNumber': email }, ['name','lastName','age','weight','height','medicalCenter','password',
     'avatar', 'sex', 'email', 'steps'] , function (err, user) {
        if(user==null){
            res.json({"login": false});
        }else{
            bcrypt.compare(password, user.password, function(err, resu) {
                if(resu==true){
                    MedicalInfo.findOne({'patient': user.id},['weight', 'height'],function(err, med){
                        res.json({"login" : true,
                        "id": user.id,
                        "name" : user.name,
                        "lastName" : user.lastName,
                        "age": user.age,
                        "medicalCenter" : user.medicalCenter,
                        "weight": med.weight,
                        "height" : med.height,
                        "avatar": user.avatar,
                        "sex": user.sex,
                        "email": user.email,
                        "steps": user.steps
                        });
                    });
                }else{
                    res.json({"login" : false})
                }
            });
        }
    });
  
};
/**
 * Actualizar datos del paciente por el doctor
 */
exports.put = (req, res, next) => {
    const updates = req.body;
    const id = updates["_id"];
    Patient.updateOne({ '_id': id }, {'name': updates["name"],
     'lastName':updates["lastName"], 'birthdate': updates["birthdate"],
     'documentType': updates["documentType"], 'documentNumber':updates["documentNumber"], 'age': updates["age"],
      'sex': updates["sex"],'medicalCenter': updates["medicalCenter"], 'email': updates["email"]}, function (err, patient) {
        if(err){
            console.log(err);
        }
    });
    res.json({"update": "OK"});
};
/**
 * Actualizar datos del paciente por paciente
 */
exports.putpat = (req, res, next) => {
    const updates = req.body;
    const id = updates["id"];
    console.log(updates);
    Patient.updateOne({ '_id': id }, {'name': updates["name"],
     'lastName':updates["lastName"], 'age': updates["age"],'avatar':updates["avatar"], 'steps': updates["steps"],
      'email': updates["email"]}, function (err, patient) {
        if(err){
            console.log("Error: "+err);
        }
    });
    res.json({"update": "OK"});
};
/**
 * Enviar correo con información
 */
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
        subject: 'BIENVENIDO A DOCBOT', // Subject line
        html: '<h2>Bienvenido a DocBot!</h2><p>'+patient["name"]+', su cuenta ha sido creada exitosamente<br/><b>Nombre de usuario: </b>'+patient["documentNumber"]+'<br/><b>Contraseña: </b>'+patient["password"]+'<br/><br/>Cordialmente, <br/> <img src="https://raw.githubusercontent.com/rjuliao/Botic-Web/master/src/assets/logos/name-logo.jpeg?token=AK6NGAVIH5DHJMUJ4634W7C5ZRF2A" width="200" height="130"><br/> <i>"Sistema de acompañamiento para pacientes con<i><br/><i>Diabetes tipo 2 y síndrome metabólico"<i><br/><strong>Universidad del norte - 2019</strong></p>'// plain text body
    };
    console.log(patient["email"]);
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    });
};
/**
 * Delete patient- Preguntar si debo borrar las metas
 */
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
/**
 * Exportar datos de los pacientes selecionados
 */
exports.exportFile = (req, res, next) => {
    const headrs = req.body;
    const ids = headrs['ids'];
    console.log(ids);
    console.log(ids[0]);
    console.log(ids[i].id);
    // A new Excel Work Book
    var workbook = new Excel.Workbook();
    // Some information about the Excel Work Book.
    workbook.creator = 'DocBot';
    //workbook.lastModifiedBy = '';
    //workbook.created = new Date(2018, 6, 19);
    //workbook.modified = new Date();
    //workbook.lastPrinted = new Date(2016, 9, 27);
    // Add Worksheets to the workbook
    // Create a sheet
    // A new Excel Work Book
    var workbook = new Excel.Workbook();
    // Some information about the Excel Work Book.
    workbook.creator = 'DocBot';
    //workbook.lastModifiedBy = '';
    //workbook.created = new Date(2018, 6, 19);
    //workbook.modified = new Date();
    //workbook.lastPrinted = new Date(2016, 9, 27);
    // Create a sheet
    var sheet1 = workbook.addWorksheet('Info_Personal_Pacientes');
    var sheet2 = workbook.addWorksheet('Info_Medica_Pacientes');
    var sheet3 = workbook.addWorksheet('Pesos_Pacientes');
    var sheet4 = workbook.addWorksheet('Metas_Pacientes');
    var sheet5 = workbook.addWorksheet('Paraclinicos_Pacientes');
    // A table header
    sheet1.columns = [
        { header: 'Id', key: 'id' },
        { header: 'Nombre completo', key: 'fullname' },
        { header: 'Fecha de nacimiento', key: 'birthdate' },
        { header: 'Edad', key: 'age' },
        { header: 'Tipo de documento', key: 'documentType' },
        { header: 'Número de documento', key: 'documentNumber' },
        { header: 'sexo', key: 'sex' },
        { header: 'correo', key: 'email' },
        { header: 'Estado civil', key: 'statusc' },
        { header: 'Estrato socioeconómico', key: 'socioeconomic' },
        { header: 'Nivel Educativo', key: 'educaLevel' },
        { header: 'Tabaquismo', key: 'smoking' },
        { header: 'Id_doctor', key: 'doc' }
    ]
    // A table header info medica
    sheet2.columns = [
        { header: 'Id_Paciente', key: 'idPat' },
        { header: 'Contexto clinico', key: 'clinicalContext' },
        { header: 'Test Findrisc', key: 'testFindRisk' },
        { header: 'Centro médico', key: 'medicalCenter' },
        { header: 'Es diabetico?', key: 'isDiabetic' },
        { header: 'Perímetro abdominal', key: 'abdominalperimeter' },
        { header: 'IMC', key: 'imc' },
        { header: 'Altura', key: 'height' }
    ]
    // A table header pesos
    sheet3.columns = [
        { header: 'IdPaciente', key: 'idP' },
        { header: 'Valor', key: 'value' },
        { header: 'Fecha', key: 'date' }
    ]
    // A table header metas
    sheet4.columns = [
        { header: 'IdPaciente', key: 'idP' },
        { header: 'Fecha de inicio', key: 'creationDate' },
        { header: 'Fecha de vencimiento', key: 'dueDate' },
        { header: 'Fecha de cumplimiento', key: 'complianceDate' },
        { header: 'Descripción', key: 'description' },
        { header: 'Cantidad', key: 'quantity' },
        { header: 'Medida', key: 'quantityType' },
        { header: 'Frecuencia', key: 'frequency' },
        { header: 'Estado', key: 'state' },
        { header: 'Progreso', key: 'progress' },
        { header: 'Número_Mensajes', key: 'nMessages' }
    ]
    // A table header paraclinicos
    sheet5.columns = [
        { header: 'IdPaciente', key: 'idP' },
        { header: 'Fecha', key: 'date' },
        { header: 'Tipo', key: 'type' },
        { header: 'Valor', key: 'value' },
        { header: 'Comentario', key: 'comment' }
    ]
    // A table header pesos
    sheet3.columns = [
        { header: 'IdPaciente', key: 'idP' },
        { header: 'Valor', key: 'value' },
        { header: 'Fecha', key: 'date' }
    ]
    for (var i in ids){
        Patient.findOne({'_id': ids[i].id}, ['name', 'lastName', 'birthdate', 'age', 'documentType', 'documentNumber', 'sex','email',
        'doc', 'civilStatus', 'socioeconimic', 'educationLevel', 'smoking'], function (err, user) {
            if(user == null ){

            }else{
                sheet1.addRow({id: user.id, fullname: user.name +' '+user.lastName, birthdate: user.birthdate, age: user.age,
                documentType: user.documentType, documentNumber: user.documentNumber, sex: user.sex, email:user.email,
                doc: user.doc, statusc: user.civilStatus, socioeconomic: user.socioeconomic,educaLevel: user.educationLevel,
                smoking: user.smoking });   
            }
                
        });
        MedicalInfo.findOne({'patient': ids[i].id},['patient', 'clinicalContext', 'testFindRisk','medicalCenter','isDiabetic',
        'abdominalperimeter','imc','height','weight'], function(err, infom){
            
            if(infom== null){
                
            }else{
                sheet2.addRow({idPat: infom.patient, clinicalContext: infom.clinicalContext , testFindRisk: infom.testFindRisk,
                    medicalCenter: infom.medicalCenter, isDiabetic:infom.isDiabetic , abdominalperimeter: infom.abdominalperimeter,
                    imc: infom.imc, height: infom.height});
                const pesos = infom.weight;
                for(var j=0; j < pesos.length; j++){
                    sheet3.addRow({id: user.id, value: pesos[i].value, date: pesos[j].date,});
                } 
            }
            
        });
        Goals.findOne({'patient': ids[i].id, 'state': "2"},['creationDate','dueDate','complianceDate','description','quantity',
            'quantityType','frequency','state','progress', 'nMessages'],function(err,goal){
            if(goal == null){

            }else{
                sheet4.addRow({idP: ids[i].id, creationDate: goal.creationDate, dueDate: goal.dueDate, complianceDate: goal.complianceDate,
                description: goal.description, quantity: goal.quantity, quantityType: '', frequency: goal.frequency, state:goal.state,
                progress: goal.progress, nMessages: goal.nMessages }); 
            }
        });
        Paraclinical.findOne({'patient': ids[i].id}, ['date', 'type', 'value', 'comment'],function(err,pc){
            if(pc == null){

            }else{
                sheet5.addRow({idP: ids[i].id, date: pc.date, type: pc.type, value: pc.value, comment: pc.comment});
            }
        });
    }
    // Save Excel on Hard Disk
    workbook.xlsx.writeFile("Datos_Pacientes.xlsx")
    .then(function() {
        // Success Message
        alert("File Saved");
    });
    res.send(workbook.xlsx);
};
/**
 * Actualizar token
 */
exports.putoken = (req, res, next) => {
    const update = req.body;
    const aidi = update["id"];
    console.log(update);
    Patient.updateOne({'_id': aidi}, {'token': update["token"]}, function(err, user){
        if(err){
            console.log("Error: "+err);
        }
    });
    res.json({"update": "ok"});
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



