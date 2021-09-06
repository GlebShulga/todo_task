const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories.controller");

router.get("/", categoriesController.get);

router.post("/", categoriesController.post);

router.patch("/", categoriesController.patch);

router.delete("/", categoriesController.remove);

module.exports = router;

