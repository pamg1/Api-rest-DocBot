"use strict";

const Goal = require("./../models/goals");
/**
 * Muestra todos las metas guardados en la bd
 */
exports.all = (req, res, next) => {
    Goal.find()
    .then( goals => {
        res.json(goals);
    })
    .catch( err => {
        next(new Error(err));
    });
};
/**
 * Recibe un JSON con toda la info de la meta y lo guarda en la bd
 */
exports.post = (req, res, next) => {
    const goal = req.body;
    goal["progress"] = {'value': goal["progress"], 'date': goal["date"] };
    new Goal(goal).save(err=>{
       console.log(err);
    });
    res.json(goal);
    
};
/**
 * Recibe un JSON con el id del paciente, devuelve JSONs con las metas asociados a este
 */
exports.findgoals = (req, res, next) => { 
    const user2 = req.body;
    const patient= user2["pat"];
    Goal.find({ 'pat': patient })
    .then( goals => {
        res.json(goals);
    })
    .catch( err => {
        next(new Error(err));
    });
  
};
/**
 * Actualizar datos de la meta
 */
exports.putpat = (req, res, next) => {
    const updates = req.body;
    const id = updates["id"];
    console.log(updates);
    Goal.updateOne({ '_id': id }, {$push:{'progress':{'value': updates["progress"],'date':updates["date"]}},
    'state':updates["state"], 'nMessages': updates["nMessages"],
    'complianceDate': updates["complianceDate"]}, function (err, patient) {
        if(err){
            console.log(err);
        }
    });
    res.json({"update": "OK"});
};

/**
 * Actualizar datos de la meta
 */
exports.putpd = (req, res, next) => {
    const updates = req.body;
    const id = updates["id"];
    console.log(updates);
    Goal.updateOne({ '_id': id }, {'description': updates["description"],
     'dueDate':updates["dueDate"], 'quantity': updates["quantity"],
     'frequency': updates["frequency"]}, function (err, patient) {
        if(err){
            console.log(err);
        }
    });
    res.json({"update": "OK"});
};

/**
 * Borrar meta
 */
exports.delete = (req, res, next) => {
    const goal = req.headers;
    const id= goal["id"];
    console.log(goal);
    Goal.deleteOne({'_id': id }, function (err) {
        if(err){
            console.log(err)
        }
        res.json({"delete":"ok"});
    });
};

/**
 * Actualizar progreso de la meta del paciente
 */
exports.putprogress = (req, res, next) => {
    const updates = req.body;
    const id = updates["id"];
    console.log(updates);
    const daatee= updates["date"];
    Goal.updateOne({ '_id': id }, {$push:{'progress':{'value': updates["progress"],'date': daatee}}}, function (err, goal) {
        if(err){
            console.log(err);
        }
        console.log(goal)
    });
    res.json({"update": "OK"});
};
/**
 * Recibe el id de la meta y nueva, devuelve JSON asociados a este
 */
exports.getprogress = (req, res, next) => { 
    const user2 = req.headers;
    const id= user2["id"];
    Goal.findOne({ '_id': id },['progress'],function (err, user) {
        if(user==null){
            res.json({"progress":"no asociado a meta"});
        }else{
            res.json({"progress":user.progress});
        }
    });
};

/**
 * Exportar datos de los pacientes selecionados
 */
exports.exportData = (req,res,next) =>{
    const headrs = req.body;
    const ids = headrs['ids'];
    var goals;
    console.log(ids);
    console.log(ids[0]);
    console.log(ids[0].id);
    for (var i in ids){
        Goals.findOne({'patient': ids[i].id, 'state': "2"},['creationDate','dueDate','complianceDate','description','quantity',
            'quantityType','frequency','state','progress', 'nMessages'],function(err,goal){
            if(goal == null ){

            }else{
                console.log(goal);
                console.log(goals);
                goals.push(goal);
            }    
        });
    }
    res.json(goals);
}

