"use strict";

const router = require("express").Router();
const controller = require("../controllers/goals");

router.route("/")
    .get(controller.all)
    .post(controller.post)
    .put(controller.putpat);

router.route("/buscar")
    .post(controller.findgoals)  

router.route("/putgoal")
    .put(controller.putpd)  

module.exports = router;