"use strict";

const router = require("express").Router();
const controller = require("../controllers/medicalInfos");

router.route("/")
    .get(controller.all)
    .post(controller.post)
    .put(controller.put);

router.route("/buscar")
    .get(controller.findmedicalinfo);  

router.route("/findTestfr")
    .get(controller.findTestFR);  

router.route("/updateweight")
    .put(controller.putweight);

router.route("/getweight")
    .get(controller.getWeight);

module.exports = router;
