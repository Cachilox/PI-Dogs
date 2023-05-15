const { Router } = require("express");
const router = Router();

const {
  allDogsHandler,
  dogsByIdHandler,
  createDogsHandler,
} = require("../handlers/dogsHandlers");

router.get("/", allDogsHandler);

router.get("/:id", dogsByIdHandler);

router.post("/", createDogsHandler);

module.exports = router;
