const generateQuestions = async (req, res) => {
  try {

    const { type } = req.query;

    const resumeText = global.resumeText || "";
    console.log("Resume Loaded:", resumeText);

    let questions = [];

    // Technical Interview
    if (type === "Technical") {

  const text =
    resumeText.toLowerCase();

  questions = [];

  if (text.includes("react")) {
    questions.push(
      "Explain the Virtual DOM in React."
    );

    questions.push(
      "What are React Hooks?"
    );
  }

  if (text.includes("node")) {
    questions.push(
      "What is the role of Node.js in web development?"
    );
  }

  if (text.includes("mongodb")) {
    questions.push(
      "Why would you choose MongoDB over SQL?"
    );
  }

  if (text.includes("python")) {
    questions.push(
      "Explain a Python project you have worked on."
    );
  }

  if (text.includes("java")) {
    questions.push(
      "What is OOP in Java?"
    );
  }

  if (text.includes("php")) {
    questions.push(
      "Explain your experience with PHP."
    );
  }

  if (text.includes("javascript")) {
    questions.push(
      "What are closures in JavaScript?"
    );
  }

  if (text.includes("project")) {
    questions.push(
      "Explain your most important project."
    );
  }

  questions.push(
    "Which technology are you most comfortable with and why?"
  );

  questions.push(
    "What technical challenges have you faced recently?"
  );

}
    // HR Interview
    else if (type === "HR") {

      questions = [
        "Tell me about yourself.",
        "What motivated you to pursue Information Technology?",
        "What did you learn from your internships?",
        "Describe a challenge you faced while learning programming.",
        "How do you handle deadlines?",
        "What are your strengths?",
        "Where do you see yourself in five years?"
      ];

    }

    // CEO Interview
    else if (type === "CEO") {

      questions = [
        "Why should our company hire you?",
        "How can your skills benefit our organization?",
        "Tell me about a leadership experience.",
        "What value can you bring to a software team?",
        "How do you handle failure?",
        "What is your biggest achievement so far?",
        "Why do you want to work in technology?"
      ];

    }

    res.status(200).json({
      questions
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  generateQuestions
};