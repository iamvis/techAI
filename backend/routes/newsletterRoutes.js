const express = require("express");
const router = express.Router();
const { createSubscription } = require("../controllers/newsletterController");

router.post("/", createSubscription);

module.exports = router;
