const express = require("express");
const router = express.Router();
const openai = require("../config/ai");
const InterviewReport = require("../models/InterviewReport");

const auth = require("../middleware/auth");

router.post("/evaluate", auth, async (req, res) => {
  try {
    const { answers } = req.body;
    console.log("User ID:", req.userId);
console.log("Answers:", answers);

    const prompt = `
You are an expert AI interview evaluator.

Return ONLY valid JSON (no markdown, no explanation):

{
  "score": number (0-100),
  "feedback": [
    {
      "question": string,
      "answer": string,
      "score": number (0-15),
      "comment": string
    }
  ],
  "recommendations": [string]
}

Rules:
- Be strict but fair
- Evaluate clarity, correctness, depth
- Penalize short answers
- Keep comments short

Answers:
${JSON.stringify(answers, null, 2)}
`;

    const response = await openai.chat.completions.create({
     model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    let content = response.choices[0].message.content;

    // 🧠 CLEAN AI OUTPUT (IMPORTANT FIX)
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    let result;
    try {
      result = JSON.parse(content);
    } catch (err) {
      console.log("JSON Parse Error:", content);
      return res.status(500).json({
        error: "AI returned invalid JSON",
      });
    }

    // 💾 OPTIONAL: SAVE TO DATABASE (REAL SYSTEM UPGRADE)
    await InterviewReport.create({
  userId: req.userId,   // 🔥 ADD THIS LINE
  interviewType: "AI Interview",
  score: result.score,
  feedback: result.feedback,
  recommendations: result.recommendations,
  answers
});
   const savedReport = await InterviewReport.create({
  userId: req.userId,
  interviewType: "AI Interview",
  score: result.score,
  feedback: result.feedback,
  recommendations: result.recommendations,
  answers
});

console.log("REPORT SAVED:", savedReport._id);
    return res.json(result);
  } catch (error) {
    console.log("AI Error:", error);
    res.status(500).json({
      error: "AI evaluation failed",
    });
  }
});

module.exports = router;