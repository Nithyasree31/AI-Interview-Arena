import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") ||
    "User";

  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    bestScore: 0
  });

  const [chartData, setChartData] =
    useState([]);

  const [skillData, setSkillData] =
    useState([]);

  const [recentHistory, setRecentHistory] =
    useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/dashboard/stats",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setStats({
        totalInterviews:
          res.data.totalInterviews,
        averageScore:
          res.data.averageScore,
        bestScore:
          res.data.bestScore
      });

      setChartData(
        res.data.chartData || []
      );

      setSkillData(
        res.data.skillData || []
      );

      setRecentHistory(
        res.data.recentHistory || []
      );

    } catch (error) {
      console.log(
        "Dashboard Error:",
        error
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020817",
        color: "white",
        display: "flex"
      }}
    >
    

      {/* MAIN CONTENT */}

      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >
        {/* HEADER */}

        <h1>
          Welcome Back, {username} 👋
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px"
          }}
        >
          Track your interview
          performance and progress
        </p>

        {/* STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}
        >
          <div style={cardStyle}>
            <h3>Total Interviews</h3>

            <h1>
              {stats.totalInterviews}
            </h1>
          </div>

          <div style={cardStyle}>
            <h3>Average Score</h3>

            <h1>
              {stats.averageScore}%
            </h1>
          </div>

          <div style={cardStyle}>
            <h3>Best Score</h3>

            <h1>
              {stats.bestScore}%
            </h1>
          </div>

          <div style={cardStyle}>
            <h3>
              Profile Completion
            </h3>

            <h1>
              {stats.totalInterviews >
              0
                ? "100%"
                : "0%"}
            </h1>
          </div>
        </div>

        {/* PERFORMANCE GRAPH */}

        <div
          style={{
            ...cardStyle,
            height: "350px",
            marginBottom: "30px"
          }}
        >
          <h2>
            📈 Performance Trend
          </h2>

          <ResponsiveContainer
            width="100%"
            height="85%"
          >
            <LineChart
              data={chartData}
            >
              <XAxis
                dataKey="week"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#38bdf8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* SKILL COMPARISON */}

        <div
          style={{
            ...cardStyle,
            height: "350px",
            marginBottom: "30px"
          }}
        >
          <h2>
            📊 Skill Comparison
          </h2>

          <ResponsiveContainer
            width="100%"
            height="85%"
          >
            <BarChart
              data={skillData}
            >
              <XAxis
                dataKey="skill"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="score"
                fill="#38bdf8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* RECENT HISTORY */}

        <div
          style={cardStyle}
        >
          <h2>
            📋 Recent Interview
            History
          </h2>

          <table
            style={{
              width: "100%",
              marginTop: "20px",
              borderCollapse:
                "collapse"
            }}
          >
            <thead>
              <tr>
                <th
                  style={
                    tableHeader
                  }
                >
                  Interview
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Date
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Score
                </th>
              </tr>
            </thead>

            <tbody>
              {recentHistory.map(
                (
                  item,
                  index
                ) => (
                  <tr
                    key={index}
                  >
                    <td
                      style={
                        tableCell
                      }
                    >
                      {item.role}
                    </td>

                    <td
                      style={
                        tableCell
                      }
                    >
                      {new Date(
                        item.date
                      ).toLocaleDateString()}
                    </td>

                    <td
                      style={
                        tableCell
                      }
                    >
                      {
                        item.score
                      }
                      %
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
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

const cardStyle = {
  background: "#0f172a",
  padding: "20px",
  borderRadius: "15px",
  border: "1px solid #1e293b"
};

const tableHeader = {
  textAlign: "left",
  padding: "12px",
  borderBottom:
    "1px solid #334155"
};

const tableCell = {
  padding: "12px",
  borderBottom:
    "1px solid #1e293b"
};

export default Dashboard;