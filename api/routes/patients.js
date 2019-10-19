"use strict";

const router = require("express").Router();
const controller = require("../controllers/patients");

router.route("/")
    .get(controller.all)
    .post(controller.post)
    .put(controller.put);

router.route("/buscar")
    .post(controller.findpatients);    

router.route("/login")
    .post(controller.login);
    
router.route("/sendemail")
    .get(controller.sendEmail);
/*
router.route("/:email")
    .get(controller.validate,controller.get);
    
router.route("/login/:email")
    .get(controller.email);


router.route("/historical/:id")
    .get(controller.validate,controller.historical)
    
router.route("/list/:id")
    .get(controller.validate,controller.list)
    .post(controller.validate,controller.addlist)
    .delete(controller.validate,controller.removelist);

router.route("/list/:id/actual")
    .get(controller.validate,controller.getlist)
        
*/
module.exports = router;