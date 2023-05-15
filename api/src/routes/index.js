const { Router } = require('express');
// Importar todos los routers;
const dogsRouter = require('./routesDogs');
const temperamentsRouter = require("./temperaments")

const router = Router();


router.use("/dogs", dogsRouter)
router.use("/temperaments", temperamentsRouter)


module.exports = router;
