const express = require("express");
const router = express.Router();

const InterviewReport = require("../models/InterviewReport");
const auth = require("../middleware/auth");

router.get("/stats", auth, async (req, res) => {
  try {
    const reports = await InterviewReport.find({
      userId: req.userId,
    }).sort({ createdAt: 1 });

    const totalInterviews = reports.length;

    const averageScore =
      totalInterviews > 0
        ? Math.round(
            reports.reduce(
              (sum, report) => sum + report.score,
              0
            ) / totalInterviews
          )
        : 0;

    const bestScore =
      totalInterviews > 0
        ? Math.max(
            ...reports.map(
              (report) => report.score
            )
          )
        : 0;

    const chartData = reports.map(
      (report, index) => ({
        week: `I${index + 1}`,
        score: report.score,
      })
    );

    const recentHistory = reports
      .slice(-5)
      .reverse()
      .map((report) => ({
        role:
          report.interviewType ||
          "Interview",
        date: report.createdAt,
        score: report.score,
      }));

    const skillData = [
      {
        skill: "Technical",
        score: averageScore,
      },
      {
        skill: "Communication",
        score:
          averageScore > 5
            ? averageScore - 5
            : averageScore,
      },
      {
        skill: "Problem Solving",
        score:
          averageScore > 3
            ? averageScore - 3
            : averageScore,
      },
      {
        skill: "Confidence",
        score:
          averageScore > 8
            ? averageScore - 8
            : averageScore,
      },
    ];

    res.json({
      totalInterviews,
      averageScore,
      bestScore,
      chartData,
      recentHistory,
      skillData,
    });
  } catch (error) {
    console.log("Dashboard Error:", error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
});

module.exports = router;