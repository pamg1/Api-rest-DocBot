"use strict";

const Patient = require("./../models/patients");
const bcrypt = require("bcrypt");
//const jwt = require('jsonwebtoken');
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
//Recibe un JSON con toda la info del paciente y lo guarda en la bd
exports.post = (req, res, next) => {
    const patient = req.body;
    const saltRounds = 10;
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
    Patient.findOne({ 'documentNumber': email }, ['name','lastName','age','weight','height','medicalCenter','password'] , function (err, user) {
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
                    "medicalCenter" : user.medicalCenter
                });
                }else{
                    res.json({"login" : false})
                }
            });
        }
    });
  
};










/*
exports.addPatient = (req, res, next) => {
    const id = req.params.idCategory;
    const patient = req.body;
    Categories.findOne({ '_id': id }, "products" , function (err, category) {
        const prods = category.products;
        prods.push(patient);
         Categories.updateOne({ "_id": id }, { "products": prods }, function (err) {
         if(err){
            console.log(err);
        }
        res.json({"status": "OK"});
    });  
    })
};

exports.get = (req, res, next) => {
    const email = req.params.email;
    Patient.findOne({ 'email': email }, function (err, user) {
        res.json(user);
    });
};


exports.logout = (req, res, next) => { 
    
};

exports.email = (req, res, next) => {
    const email = req.params.email;
    Patient.findOne({ 'email': email },'email', function (err, user) {
        res.json(user);
    });
};



exports.put = (req, res, next) => {
    const updates = req.body;
    const email = updates["email"];
    Patient.updateOne({ 'email': email }, { 'name': updates["name"], 'profileImage':updates["profileImage"], 'address': updates["address"] }, function (err, user) {
        if(err){
            console.log(err);
        }
    });
    res.json({"update": "OK"});
};

exports.delete = (req, res, next) => {
    Patient.deleteMany({ 'email': 'vacilalorumbero' }, function (err) {
        if(err){
            console.log(err)
        }
        res.json({"You":"Are a devil"});
    });
};


exports.list = (req, res, next) => {
    const id =  req.params.email;
    Patient.findOne({ '_id': id }, 'lists' , function (err, user) {
        const lists = user.lists;
        if(user!=null){
            if(user.lists != null){
                res.json(lists[lists[lists.length - 1]]);   
            }else{
                res.json({});    
            }
        }else{
            res.json({'status':'NONE'});
        }
    })
};

exports.addlist = (req, res, next) => { 
    const list_new = req.body;    
    const id = req.params.id;
    Patient.findOne({ '_id': id }, "lists" , function (err, user) {
        const lists = user.lists;
        var months = new Array(
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            );
            var fecha_actual = new Date();
        if(lists.length > 0){
            lists[lists.length - 1]["products"].push(list_new);
            lists[lists.length - 1]["date"] = fecha_actual.getDate() +
                  " de " +
                  months[fecha_actual.getMonth()] +
                  " del " +
                  fecha_actual.getFullYear();
        }else{
            lists.push({
                "products" : [],
                "date":  fecha_actual.getDate() +
                  " de " +
                  months[fecha_actual.getMonth()] +
                  " del " +
                  fecha_actual.getFullYear()
            })
            lists[0]["products"].push(list_new);
        }
        Patient.updateOne({ "_id": id }, { "lists": lists }, function (err) {
            if(err){
                console.log(err);
            }
            res.json({"status": "OK"});
        });
    });
    
};

exports.removelist = (req, res, next) => { 
    const list_remove = req.headers["product"];;    
    const id = req.params.id;
    Patient.findOne({ '_id': id }, "lists" , function (err, user) {
        const lists = user.lists;
        if(lists != null){
        for(var i = lists[lists.length - 1]["products"].length - 1; i > 0; i--) {
            if( lists[lists.length - 1]["products"][i]["name"] === list_remove) {
               lists[lists.length - 1]["products"].splice(i, 1);
            }
        }
        Patient.updateOne({ "_id": id }, { "lists": lists }, function (err) {
            if(err){
                console.log(err);
            }
            res.json({"status": "OK"});
        });
        }else{
              res.json({"status": "NOOK"});
        }
    });
};



exports.getlist  = (req, res, next) => { 
    const id = req.params.id;
    Patient.findOne({ '_id': id }, "lists" , function (err, user) {
        if(user.lists){
            res.json(user.lists[user.lists.length - 1]);   
        }else{
            res.json({})
        }
    })
};

exports.historical = (req, res, next) => { 
    const id = req.params.id;
    Patient.findOne({ '_id': id }, "lists" , function (err, user) {
        res.json(user.lists);
    })
};
*/



