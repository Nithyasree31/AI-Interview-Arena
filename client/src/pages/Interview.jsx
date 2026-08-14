import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Interview() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [type, setType] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  // 🎤 SPEECH TO TEXT SETUP
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
    console.log(
  "SpeechRecognition:",
  window.SpeechRecognition
);

console.log(
  "webkitSpeechRecognition:",
  window.webkitSpeechRecognition
);

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  }

  const startVoiceInput = () => {
    if (!recognition) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };
  };

  // 🔊 TEXT TO SPEECH
  const speakQuestion = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
  };

  // 🎯 AUTO SPEAK QUESTION
  useEffect(() => {
    if (questions.length > 0) {
      speakQuestion(questions[currentQuestion]);
    }
  }, [currentQuestion, questions]);

  // 📌 LOAD QUESTIONS
  const loadQuestions = async (selectedType) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/questions/generate?type=${selectedType}`
      );

      setQuestions(res.data.questions);
      setType(selectedType);
      setCurrentQuestion(0);
      setAnswers([]);
      setAnswer("");
    } catch (error) {
      console.log(error);
      alert("Failed to load questions");
    }
  };

  // 🚀 NEXT QUESTION + AI BACKEND
  const nextQuestion = async () => {

  // ✅ Prevent empty answers
  if (!answer.trim()) {
    alert("Please answer the question before continuing");
    return;
  }

  const updatedAnswers = [
    ...answers,
    {
      question: questions[currentQuestion],
      answer,
      mode: isRecording ? "voice" : "text"
    }
  ];

  setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
    } else {
      try {
      const token = localStorage.getItem("token");

const res = await axios.post(
  "http://localhost:5000/api/ai/evaluate",
  {
    answers: updatedAnswers
  },
  {
    headers: {
      Authorization: token
    }
  }
); 

        const aiResult = res.data;
        console.log("AI Result:", aiResult);

        navigate("/report", {
          state: {
            aiResult,
            interviewType: type
          }
        });
      } catch (error) {
  console.log("AI Error:", error);

  console.log(
    "Server Response:",
    error.response?.data
  );

  alert(
    error.response?.data?.error ||
    "AI evaluation failed"
  );
}
    }
  };
  

  // ================= UI =================

  if (!type) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>AI Interview Arena</h1>
          <p>Select Interview Type</p>

          <button onClick={() => loadQuestions("HR")} style={buttonStyle}>
            HR Interview
          </button>

          <br /><br />

          <button onClick={() => loadQuestions("Technical")} style={buttonStyle}>
            Technical Interview
          </button>

          <br /><br />

          <button onClick={() => loadQuestions("CEO")} style={buttonStyle}>
            CEO Interview
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={styles.container}>
        <h2>Loading Questions...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        <h1>AI Interview Arena</h1>
        <h2>{type} Interview</h2>

        {/* Progress */}
        <div style={styles.progressBar}>
          <div
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              height: "100%",
              background: "#38bdf8"
            }}
          />
        </div>

        <h3>
          Question {currentQuestion + 1} / {questions.length}
        </h3>

        {/* QUESTION BOX */}
        <div style={styles.questionBox}>
          <h2>{questions[currentQuestion]}</h2>
        </div>

        {/* 🔊 Repeat Question */}
        <button
          onClick={() => speakQuestion(questions[currentQuestion])}
          style={{
            ...buttonStyle,
            background: "#a855f7",
            marginBottom: "10px"
          }}
        >
          🔊 Repeat Question
        </button>

        {/* ANSWER BOX */}
        <textarea
          rows="8"
          value={answer}
          placeholder="Type or speak your answer..."
          onChange={(e) => setAnswer(e.target.value)}
          style={styles.textarea}
        />

        {/* 🎤 VOICE INPUT */}
        <br />

        <button
          onClick={startVoiceInput}
          style={{
            ...buttonStyle,
            background: isRecording ? "red" : "#22c55e",
            marginTop: "10px"
          }}
        >
          {isRecording ? "🎤 Listening..." : "🎤 Speak Answer"}
        </button>

        {isRecording && (
          <p style={{ color: "red", marginTop: "10px" }}>
            Listening... Speak now 🎤
          </p>
        )}

        <br /><br />

        {/* NEXT BUTTON */}
        <button onClick={nextQuestion} style={buttonStyle}>
          {currentQuestion === questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}

// ================= STYLES =================

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "20px"
  },
  card: {
    width: "500px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    textAlign: "center"
  },
  mainCard: {
    width: "850px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    borderRadius: "20px",
    padding: "40px"
  },
  progressBar: {
    width: "100%",
    height: "12px",
    background: "#334155",
    borderRadius: "10px",
    marginBottom: "20px"
  },
  questionBox: {
    padding: "20px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "10px",
    marginBottom: "20px"
  },
  textarea: {
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px"
  }
};

const buttonStyle = {
  padding: "12px 30px",
  border: "none",
  borderRadius: "10px",
  background: "#38bdf8",
  color: "white",
  fontSize: "16px",
  cursor: "pointer"
};

export default Interview;