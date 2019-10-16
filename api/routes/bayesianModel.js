"use strict";

const router = require("express").Router();
const controller = require("../controllers/bayesianModel");

router.route("/")
    .get(controller.all)
    .post(controller.post)
    .put(controller.put);

router.route("/buscar")
    //.post(controller.findmessages)  

module.exports = router;