const Report = require("../models/Report");

const saveReport = async (req, res) => {
  try {

    const {
      interviewType,
      score,
      answers
    } = req.body;

    const report = await Report.create({
      interviewType,
      score,
      answers
    });

    res.status(201).json({
      message: "Report Saved Successfully",
      report
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getReports = async (req, res) => {
  try {

    const reports = await Report.find()
      .sort({ createdAt: -1 });

    res.status(200).json(reports);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  saveReport,
  getReports
};