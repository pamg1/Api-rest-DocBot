"use strict";

const router = require("express").Router();
const controller = require("../controllers/doctors");

router.route("/")
    .get(controller.all)
    .post(controller.post);
    //.delete(controller.validate, controller.delete);

router.route("/login")
    .post(controller.login);

router.route("/changepass")
    .put(controller.putpassword);

router.route("/codever")
    .get(controller.codever);

module.exports = router;