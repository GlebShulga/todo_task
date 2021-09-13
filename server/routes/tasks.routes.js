const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasks.controller");

router.get("/", tasksController.get);

router.post("/", tasksController.post);

router.patch("/", tasksController.patch);

module.exports = router;

