const express = require("express");

const router = express.Router();
const InterviewReport = require("../models/InterviewReport");
// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await InterviewReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});
const {
  saveReport,
  getReports
} = require("../controllers/reportController");

router.post("/save", saveReport);

router.get("/all", getReports);

module.exports = router;