import { useState } from "react";
import axios from "axios";

function ResumeUpload() {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/analysis/analyze",
        formData
      );

      setMessage(res.data.message);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Upload Failed"
      );

    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
      }}
    >

      <div
        style={{
          width: "500px",
          padding: "40px",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.1)",
          backdropFilter: "blur(15px)",
          textAlign: "center",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.3)"
        }}
      >

        <h1>
          📄 Resume Analysis
        </h1>

        <p>
          Upload your resume and let
          AI analyze your profile.
        </p>

        <br />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <br />
        <br />

        {file && (
          <div
            style={{
              padding: "15px",
              background:
                "rgba(255,255,255,0.15)",
              borderRadius: "10px"
            }}
          >
            Selected File:
            <br />
            <b>{file.name}</b>
          </div>
        )}

        <br />

        <button
          onClick={handleUpload}
          style={{
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            background: "#38bdf8",
            color: "white",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Analyze Resume
        </button>

        <br />
        <br />

        {message && (
          <div
            style={{
              padding: "10px",
              borderRadius: "10px",
              background:
                "rgba(34,197,94,0.2)"
            }}
          >
            {message}
          </div>
        )}

      </div>

    </div>
  );
}

export default ResumeUpload;