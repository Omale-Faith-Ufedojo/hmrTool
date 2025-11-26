import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PatientList from "../components/PatientList";
import usePatients from "../hooks/usePatients";

export default function PatientListPage({ user, onLogout }) {
  const navigate = useNavigate();
  const { patients, deletePatient, clearPatients } = usePatients();

  return (
    <div>
      <Header onLogout={onLogout} userEmail={user.email} />
      <main style={{ padding: "20px" }}>
        <h2>All Registered Patients</h2>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginBottom: "20px",
            padding: "10px",
            background: "#1565d8",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>

        <PatientList
          patients={patients}
          onDelete={deletePatient}
          onClear={clearPatients}
          onEdit={() => {}} // optional: disable edit here
        />
      </main>
    </div>
  );
}
