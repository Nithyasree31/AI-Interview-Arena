const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  interviewType: {
    type: String,
    required: true
  },

  score: {
    type: Number,
    required: true
  },

  answers: [
    {
      question: String,
      answer: String
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Report",
  reportSchema
);