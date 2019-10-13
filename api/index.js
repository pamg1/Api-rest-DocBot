"use strict";

const router = require("express").Router();

const patientsRoutes = require("./routes/patients");
router.use("/patients", patientsRoutes);

const doctorsRoutes = require("./routes/doctors");
router.use("/doctors", doctorsRoutes);

const goalsRoutes = require("./routes/goals");
router.use("/goals", goalsRoutes);

const goalsHistoriesRoutes = require("./routes/goalsHistories");
router.use("/goalsHistories", goalsHistoriesRoutes);

const answersRoutes = require("./routes/answers");
router.use("/answers", answersRoutes);

const appointmentsRoutes = require("./routes/appointments");
router.use("/appointments", appointmentsRoutes);

const messagesRoutes = require("./routes/messages");
router.use("/messages", messagesRoutes);

//const messagesHistoriesRoutes = require("./routes/messagesHistories");
//router.use("/messagesHistories", goalsHistoriesRoutes);

const medicalInfosRoutes = require("./routes/medicalInfos");
router.use("/medicalInfos", medicalInfosRoutes);

const paraclinicalsRoutes = require("./routes/paraclinicals");
router.use("/paraclinicals", paraclinicalsRoutes);

module.exports = router;