import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (id === "admin" && password === "admin123") {
      localStorage.setItem("adminToken", "your_token_here");
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleLogin} className="login-form">
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Admin Login</h2>
        <input
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="Login ID"
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: '#5a3ff6', color: '#fff', border: 'none', fontWeight: 600 }}>Login</button>
        {error && <div style={{ color: "#dc2626", marginTop: 12, textAlign: 'center' }}>{error}</div>}
        <div style={{ marginTop: 16, color: '#888', fontSize: 14 }}>
          <b>Login ID:</b> admin<br/>
          <b>Password:</b> admin123
        </div>
      </form>
    </div>
  );
} 