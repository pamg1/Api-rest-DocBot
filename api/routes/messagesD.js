"use strict";

const router = require("express").Router();
const controller = require("../controllers/messagesD");

router.route("/")
    .get(controller.all)
    .post(controller.post);
    //.put(controller.put);
    //.delete(controller.delete);

router.route("/findByDocandP")
    .get(controller.findmessagesbydoc);
    
router.route("/findByPat")
    .get(controller.findmessagesbypat); 

module.exports = router;