const express = require("express");
const router = express.Router();
const InterviewReport = require("../models/InterviewReport");
const auth = require("../middleware/auth");

router.get("/history", auth, async (req, res) => {
  try {

    console.log("===== HISTORY REQUEST =====");
    console.log("User ID:", req.userId);

    const reports = await InterviewReport.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    console.log("Reports Found:", reports.length);

    res.json(reports);

  } catch (error) {

    console.log("History Error:", error);

    res.status(500).json({
      error: "Failed to fetch reports"
    });
  }
});

module.exports = router;