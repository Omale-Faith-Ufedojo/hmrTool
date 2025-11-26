import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { toast } from "react-toastify";

export default function AllPatientsPage({
  user,
  onLogout,
  patients,
  setPatients,
  setEditPatient,
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Delete patient
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      const updated = patients.filter((p) => p.id !== id);
      setPatients(updated);
      localStorage.setItem("patients", JSON.stringify(updated));
      toast.success("Patient deleted successfully");
    }
  };

  // Edit patient
  const handleEdit = (p) => {
    setEditPatient(p);
    navigate("/dashboard");
  };

  // Filter patients by search
  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header userEmail={user.email} onLogout={onLogout} />

      <main
        style={{
          flex: 1,
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#1565d8" }}>All Patients</h2>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginBottom: "20px",
            padding: "10px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 18px",
            marginBottom: "20px",
            background: "#e0e0e0",
            color: "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>

        {/* Table */}
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            overflowX: "auto",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#1565d8", color: "#fff" }}>
              <tr>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Age
                </th>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Phone
                </th>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  DOB
                </th>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "12px" }}
                  >
                    No patients found
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #ccc" }}>
                    <td style={{ padding: "12px" }}>{p.name}</td>
                    <td style={{ padding: "12px" }}>{p.age}</td>
                    <td style={{ padding: "12px" }}>{p.phone}</td>
                    <td style={{ padding: "12px" }}>{p.email}</td>
                    <td style={{ padding: "12px" }}>{p.dob}</td>
                    <td
                      style={{
                        padding: "12px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <Link
                        to={`/patients/${p.id}/history`}
                        style={{
                          padding: "6px 10px",
                          background: "#1565d8",
                          color: "#fff",
                          borderRadius: "4px",
                          textDecoration: "none",
                        }}
                      >
                        History
                      </Link>
                      <button
                        onClick={() => handleEdit(p)}
                        style={{
                          padding: "6px 10px",
                          background: "#f0ad4e",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        style={{
                          padding: "6px 10px",
                          background: "#d9534f",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
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
