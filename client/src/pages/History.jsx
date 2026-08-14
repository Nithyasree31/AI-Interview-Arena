import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function History() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/history/history",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("Report:", res.data);

        setReport(res.data);
      } catch (error) {
        console.log("History Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <h1>📊 Interview History</h1>

        <br />

        {loading ? (
          <h3>Loading Reports...</h3>
        ) : report.length === 0 ? (
          <h3>No Interview Reports Found</h3>
        ) : (
          report.map((item, index) => (
            <div
              key={item._id || index}
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "20px",
                borderRadius: "15px",
                marginBottom: "20px",
              }}
            >
              <h2>{item.interviewType}</h2>

              <p>
                <strong>Score:</strong> {item.score}%
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>

              {item.recommendations &&
                item.recommendations.length > 0 && (
                  <>
                    <p>
                      <strong>Recommendations:</strong>
                    </p>

                    <ul>
                      {item.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </>
                )}
            </div>
          ))
        )}

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            background: "#38bdf8",
            color: "white",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Back To Dashboard
        </button>
      </div>
    </div>
  );
}

export default History;