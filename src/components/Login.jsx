import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function AllPatientsPage({ user, onLogout, patients, setPatients, setEditPatient }) {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (p) => {
    setEditPatient(p);
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", display: "flex", flexDirection: "column" }}>
      <Header onLogout={onLogout} userEmail={user.email} />
      <main style={{ flex: 1, padding: "30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ marginBottom: "20px", color: "#1565d8" }}>All Patients</h2>
        <button onClick={() => navigate("/dashboard")} style={{ padding: "10px 18px", marginBottom: "20px", background: "#e0e0e0", color: "#333", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
          Back to Dashboard
        </button>

        <div style={{ width: "100%", maxWidth: "900px", background: "#fff", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#1565d8", color: "#fff" }}>
              <tr>
                <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Gender</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Age</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Address</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: "15px", textAlign: "center", color: "#555" }}>No patients registered yet.</td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "12px" }}>{p.name}</td>
                    <td style={{ padding: "12px" }}>{p.gender}</td>
                    <td style={{ padding: "12px" }}>{p.age}</td>
                    <td style={{ padding: "12px" }}>{p.address}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <button onClick={() => handleEdit(p)} style={{ padding: "6px 12px", marginRight: "8px", background: "#1565d8", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDelete(p.id)} style={{ padding: "6px 12px", background: "#d32f2f", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
