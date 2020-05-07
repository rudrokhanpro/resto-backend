const router = require("express").Router();

// Intermediates routers
const clientRouter = require("./clientRouter");

router.use("/api/v1/clients", clientRouter);

module.exports = router;
