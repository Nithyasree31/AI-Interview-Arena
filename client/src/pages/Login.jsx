import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login button clicked");
    console.log("Form Data:", formData);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log("Response:", res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");
      localStorage.setItem(
        "username",
        res.data.user.name
      );

      navigate("/dashboard");
    } catch (error) {
      console.log("FULL ERROR:", error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-logo">
        🧠 Interview Arena
      </div>

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Sign in to continue your interview preparation
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="password-row">
            <label>Password</label>

            <Link
              to="/forgot-password"
              className="forgot-link"
            >
              Forgot Password?
            </Link>
          </div>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="show-password-btn"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword
              ? "Hide Password"
              : "Show Password"}
          </button>

          <button
            type="submit"
            className="login-btn"
          >
            Sign In
          </button>

        </form>

      </div>

      <p className="register-text">
        New here?{" "}
        <Link to="/register">
          Create Account
        </Link>
      </p>

    </div>
  );
}

export default Login;