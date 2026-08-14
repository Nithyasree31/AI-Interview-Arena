import { useLocation, useNavigate } from "react-router-dom";

function Report() {
  console.log("REPORT COMPONENT LOADED");
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Location State:", location.state);
  const aiData = location.state?.aiResult;

  if (!aiData) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px"
        }}
      >
        No Interview Data Found
      </h2>
    );
  }
  
  const score = aiData.score || 0;
  const feedbackList = aiData.feedback || [];
  const recommendations = aiData.recommendations || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        padding: "40px"
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <h1 style={{ textAlign: "center" }}>
          Interview Report (AI Powered)
        </h1>

        <br />

        {/* SCORE SECTION */}
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "20px"
          }}
        >
          <h2>Score: {score}%</h2>

          <h2>
            Performance:{" "}
            {score >= 85
              ? "🏆 Excellent"
              : score >= 70
              ? "🥇 Good"
              : score >= 50
              ? "🥈 Average"
              : "📚 Needs Improvement"}
          </h2>

          <h3>Questions Answered: {feedbackList.length}</h3>
        </div>

        {/* RECOMMENDATIONS */}
        <div
          style={{
            background: "rgba(59,130,246,0.15)",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "20px"
          }}
        >
          <h2>🎯 Recommended Learning Topics</h2>

          <ul>
            {recommendations.map((item, index) => (
              <li key={index}>✓ {item}</li>
            ))}
          </ul>
        </div>

        <h2>Interview Answers (AI Evaluation)</h2>

        <br />

        {/* AI FEEDBACK LIST */}
        {feedbackList.map((item, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "15px"
            }}
          >
            <h3>Question {index + 1}</h3>

            <p>
              <b>Question:</b> {item.question}
            </p>

            <p>
              <b>Your Answer:</b> {item.answer}
            </p>

            <p>
              <b>Score:</b> {item.score}/15
            </p>

            <p>
              <b>AI Feedback:</b> {item.comment}
            </p>
          </div>
        ))}

        <br />

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            background: "#38bdf8",
            color: "white",
            cursor: "pointer"
          }}
        >
          Back To Dashboard
        </button>
      </div>
    </div>
  );
}

export default Report;