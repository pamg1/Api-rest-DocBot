"use strict";

const router = require("express").Router();
var cors = require('cors')

const patientsRoutes = require("./routes/patients");
router.use("/patients", patientsRoutes);

const doctorsRoutes = require("./routes/doctors");
router.use("/doctors", doctorsRoutes);

const goalsRoutes = require("./routes/goals");
router.use("/goals", goalsRoutes);

const goalpsRoutes = require("./routes/goalps");
router.use("/goalps", goalpsRoutes);

const messagesRoutes = require("./routes/messages");
router.use("/messages", messagesRoutes);

const messagesDRoutes = require("./routes/messagesD");
router.use("/messagesD", messagesDRoutes);

const medicalInfosRoutes = require("./routes/medicalInfos");
router.use("/medicalInfos", medicalInfosRoutes);

const paraclinicalsRoutes = require("./routes/paraclinicals");
router.use("/paraclinicals", paraclinicalsRoutes);

const bayesianModelRoutes = require("./routes/bayesianModel");
router.use("/bayesianModel", bayesianModelRoutes);

module.exports = router;