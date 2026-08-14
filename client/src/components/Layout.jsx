import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#020817",
        color: "white"
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "250px",
          background: "#0f172a",
          padding: "25px",
          borderRight: "1px solid #1e293b"
        }}
      >
        <h2
          style={{
            color: "#38bdf8",
            marginBottom: "40px"
          }}
        >
          Interview Arena
        </h2>

        <div
          style={menuStyle}
          onClick={() => navigate("/dashboard")}
        >
          📊 Dashboard
        </div>

        <div
          style={menuStyle}
          onClick={() => navigate("/resume")}
        >
          📄 Resume Upload
        </div>

        <div
          style={menuStyle}
          onClick={() => navigate("/interview")}
        >
          🎤 Interview
        </div>

        <div
          style={menuStyle}
          onClick={() => navigate("/history")}
        >
          📑 Reports
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

const menuStyle = {
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "10px",
  cursor: "pointer",
  background: "#1e293b"
};

export default Layout;