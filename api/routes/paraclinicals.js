"use strict";

const router = require("express").Router();
const controller = require("../controllers/paraclinicals");

router.route("/")
    .get(controller.all)
    .post(controller.post);
    //.put(controller.validate,controller.put);

router.route("/buscar")
    .post(controller.findparaclinicals)  

module.exports = router;