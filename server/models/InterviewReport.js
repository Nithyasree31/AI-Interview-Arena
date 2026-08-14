const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  interviewType: String,

  score: Number,

  feedback: Array,

  recommendations: [String],

  answers: [
    {
      question: String,
      answer: String,
      score: Number,
      comment: String,
      mode: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("InterviewReport", interviewSchema);