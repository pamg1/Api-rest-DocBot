"use strict";

const router = require("express").Router();
const controller = require("../controllers/paraclinicals");

router.route("/")
    .get(controller.all)
    .post(controller.post);
    //.put(controller.validate,controller.put);

router.route("/buscar")
    .get(controller.findparaclinicals)
    .post(controller.findparaclinicalsbypandt);

router.route("/document")
    .get(controller.doc);

module.exports = router;