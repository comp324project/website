const express = require("express");
const router = express.Router();
const deepseekController = require("../controllers/deepseek")

router.post("/tailor", deepseekController.tailorResume)

module.exports = router;