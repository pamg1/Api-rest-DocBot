"use strict";

const router = require("express").Router();

const patientsRoutes = require("./routes/patients");
router.use("/patients", patientsRoutes);

const doctorsRoutes = require("./routes/doctors");
router.use("/doctors", doctorsRoutes);

module.exports = router;