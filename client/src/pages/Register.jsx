import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(
        res.data.message ||
        "Registration Successful"
      );

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">

        <div className="logo">
          🧠 Interview Arena
        </div>

        <div className="register-card">

          <h1 className="register-title">
            Create your account
          </h1>

          <p className="register-subtitle">
            Free forever. No credit card.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="register-btn"
            >
              Create Account
            </button>

          </form>

          <p className="terms">
            By signing up you agree to our Terms & Privacy.
          </p>

        </div>

        <p className="login-link">
          Already a member?{" "}
          <Link
            to="/"
            style={{
              color: "#38bdf8",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;