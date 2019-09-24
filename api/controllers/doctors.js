"use strict";

const Doctors = require("../models/doctors");
const bcrypt = require("bcrypt");
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
exports.post = (req, res, next) => {
    const doctors = req.body;
    const saltRounds = 10;
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
 
/*
exports.get = (req, res, next) => {
    
};

exports.put = (req, res, next) => {
    
};

exports.prods = (req, res, next) => {
    const id = req.params.idCategory;
     Categories.findOne({ '_id': id }, "products" , function (err, category) {
             res.json(category.products);
     })
};


exports.addprod = (req, res, next) => {
    const id = req.params.idCategory;
    const product = req.body;
    Categories.findOne({ '_id': id }, "products" , function (err, category) {
        const prods = category.products;
        prods.push(product);
         Categories.updateOne({ "_id": id }, { "products": prods }, function (err) {
         if(err){
            console.log(err);
        }
        res.json({"status": "OK"});
    });  
    })
};

exports.removeprod = (req, res, next) => {
    const id = req.params.idCategory;
    const product = req.body;
    Categories.findOne({ '_id': id }, "products" , function (err, category) {
        const prods = category.products;
        const new_prods =  prods.filter(function(prod){
            return prod.name != product.name;
        });
        Categories.updateOne({ "_id": id }, { "products": new_prods }, function (err) {
         if(err){
            console.log(err);
        }
        res.json({"status": "OK"});
    });  
    });
};


exports.delete = (req, res, next) => {
    const name = req.body["name"];
    Categories.deleteOne({ 'name': name }, function (err) {
        if(err){
            console.log(err);
        }
        res.json({"status": "OK"})
    });
};*/