import React, { useState } from "react";

export default function PatientList({ patients, onDelete, onEdit, onClear }) {
  const [search, setSearch] = useState("");

  // filter patients by name or contact
  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto" }}>
      <h3>Registered Patients</h3>

      <input
        type="text"
        placeholder="Search by name or contact..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          margin: "10px 0",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {filtered.length === 0 ? (
        <p style={{ textAlign: "center" }}>No patients found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered.map((p) => (
            <li
              key={p.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <span>
                {p.name} | {p.age} | {p.gender} | {p.contact}
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => onEdit(p)}
                  style={{
                    background: "#1565d8",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  style={{
                    background: "#b00020",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {patients.length > 0 && (
        <button
          onClick={onClear}
          style={{
            marginTop: "12px",
            width: "100%",
            padding: "10px",
            background: "#b00020",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Clear All Patients
        </button>
      )}
    </div>
  );
}
