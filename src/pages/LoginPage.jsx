import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill all fields");
    onLogin(email);
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa"
      }}>
        <form onSubmit={handleLogin} style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ textAlign: "center" }}>FaithMed Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Show Password
          </label>
          <button type="submit" style={{
            padding: "12px",
            background: "#1565d8",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>Login</button>
        </form>
      </div>
    </div>
  );
}
