import React from "react";

export default function Header({ userEmail, onLogout }) {
  return (
    <header
      style={{
        width: "100%",
        padding: "15px 30px",
        background: "#1565d8",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>FaithMed</h1>
      {userEmail && (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span>{userEmail}</span>
          <button
            onClick={onLogout}
            style={{
              padding: "8px 15px",
              background: "#fff",
              color: "#1565d8",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
