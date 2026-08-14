import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#001f4d)",
        color: "white",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "25px 60px"
        }}
      >
        <h2
          style={{
            color: "#38bdf8",
            fontSize: "30px"
          }}
        >
          🧠 Interview Arena
        </h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 25px",
              borderRadius: "10px",
              border: "none",
              background: "#1e293b",
              color: "white",
              cursor: "pointer"
            }}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "12px 25px",
              borderRadius: "10px",
              border: "none",
              background:
                "linear-gradient(90deg,#06b6d4,#3b82f6,#8b5cf6)",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "40px"
        }}
      >
        <div style={{ maxWidth: "900px" }}>
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              lineHeight: "1.1"
            }}
          >
            Practice with an AI
            <br />
            that interviews
            <br />
            like a real
            <span
              style={{
                color: "#38bdf8"
              }}
            >
              {" "}
              human.
            </span>
          </h1>

          <p
            style={{
              marginTop: "30px",
              fontSize: "22px",
              color: "#cbd5e1"
            }}
          >
            Upload your resume, attend AI-powered interviews,
            receive instant feedback, and improve your chances
            of getting hired.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;