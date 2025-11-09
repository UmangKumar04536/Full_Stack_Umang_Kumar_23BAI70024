import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.text();
      if (response.ok) {
        localStorage.setItem("loggedInUser", formData.username);
        setIsLoggedIn(true);
        navigate("/"); // redirect to home after successful login
      } else {
        setMessage(result);
      }
    } catch (err) {
      setMessage("⚠️ Server error, please try again.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "Poppins",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <h2>🔐 Login</h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "300px",
          margin: "0 auto",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
          style={{
            padding: "8px",
            width: "100%",
            border: "1px solid #d1d5db",
            borderRadius: "5px",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          style={{
            padding: "8px",
            width: "100%",
            border: "1px solid #d1d5db",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "500",
            width: "100%",
          }}
        >
          Login
        </button>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>

      <p style={{ marginTop: "15px" }}>
        Don’t have an account?{" "}
        <Link to="/register" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "500" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}

export default Login;
