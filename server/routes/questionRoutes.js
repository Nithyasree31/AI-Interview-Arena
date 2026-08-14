const express = require("express");
const router = express.Router();

const {
  generateQuestions
} = require("../controllers/questionController");

router.get("/generate", generateQuestions);

module.exports = router;