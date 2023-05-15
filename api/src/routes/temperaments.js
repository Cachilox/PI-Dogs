const express = require("express");
const router = express.Router();
const allTemperaments = require("../handlers/temperamentsHandler");

router.get("/", allTemperaments)

module.exports = router;
