import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PatientForm from "../components/PatientForm";

export default function DashboardPage({ user, onLogout, patients, setPatients, editPatient, setEditPatient }) {
  const navigate = useNavigate();

  const handleAddOrUpdate = (patient) => {
    if (editPatient?.id) {
      // Update existing patient
      const updated = patients.map((p) =>
        p.id === editPatient.id ? { ...patient, id: editPatient.id } : p
      );
      setPatients(updated);

      // Ensure history exists
      const allHistory = JSON.parse(localStorage.getItem("medicalHistory")) || {};
      if (!allHistory[editPatient.id]) {
        allHistory[editPatient.id] = [];
        localStorage.setItem("medicalHistory", JSON.stringify(allHistory));
      }

      setEditPatient(null);
    } else {
      // Add new patient
      const newPatient = { ...patient, id: Date.now() };
      setPatients([...patients, newPatient]);

      // Initialize empty medical history for new patient
      const allHistory = JSON.parse(localStorage.getItem("medicalHistory")) || {};
      allHistory[newPatient.id] = [];
      localStorage.setItem("medicalHistory", JSON.stringify(allHistory));
    }
  };

  const handleCancelEdit = () => setEditPatient(null);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", display: "flex", flexDirection: "column" }}>
      <Header userEmail={user.email} onLogout={onLogout} />
      <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "30px" }}>
        <div style={{ width: "100%", maxWidth: "500px", background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            {editPatient ? "Edit Patient" : "Register Patient"}
          </h2>

          <PatientForm
            editPatient={editPatient}
            onAdd={handleAddOrUpdate}
            onCancelEdit={handleCancelEdit}
          />

          <button
            onClick={() => navigate("/patients")}
            style={{ marginTop: "20px", width: "100%", padding: "12px", background: "#1565d8", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            Go to All Patients
          </button>
        </div>
      </main>
    </div>
  );
}
