import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MedicalHistoryPage({ patients }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState([]);

  const [visitDate, setVisitDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

  // Load patient & history once
  useEffect(() => {
    const found = patients.find((p) => String(p.id) === String(id));
    setPatient(found);

    const allHistory = JSON.parse(localStorage.getItem("medicalHistory")) || {};
    setHistory(allHistory[id] || []);
  }, [id, patients]);

  const addRecord = (e) => {
    e.preventDefault();
    if (!visitDate || !symptoms || !diagnosis || !treatment) {
      toast.error("Please fill in all fields");
      return;
    }

    const newRecord = { date: visitDate, symptoms, diagnosis, treatment };
    const updated = [...history, newRecord];
    setHistory(updated);

    const allHistory = JSON.parse(localStorage.getItem("medicalHistory")) || {};
    allHistory[id] = updated;
    localStorage.setItem("medicalHistory", JSON.stringify(allHistory));

    toast.success("Medical record added");
    
    setVisitDate("");
    setSymptoms("");
    setDiagnosis("");
    setTreatment("");
  };

  if (!patient) {
    return (
      <div style={{ padding: "40px" }}>
        <p>Patient not found</p>
        <button
          onClick={() => navigate("/patients")}
          style={{
            marginTop: "20px",
            padding: "10px 18px",
            background: "#1565d8",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to All Patients
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
      <h1 style={{ fontSize: "28px", color: "#1565d8", marginBottom: "20px" }}>
        Medical History for {patient.name}
      </h1>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* Patient Info */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "15px", fontSize: "20px" }}>
            Patient Information
          </h2>

          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Phone:</strong> {patient.phone}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>DOB:</strong> {patient.dob}</p>

          <div style={{ marginTop: "25px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              to="/patients"
              style={{
                padding: "10px",
                background: "#333",
                color: "white",
                borderRadius: "6px",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Back to All Patients
            </Link>

            <button
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "10px",
                background: "#1565d8",
                color: "#fff",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Medical History */}
        <div
          style={{
            flex: 2,
            minWidth: "350px",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "15px", fontSize: "20px" }}>
            Medical History
          </h2>

          <div
            style={{
              maxHeight: "250px",
              overflowY: "auto",
              paddingRight: "10px",
              marginBottom: "20px",
            }}
          >
            {history.length === 0 ? (
              <p style={{ color: "#888" }}>No medical history yet</p>
            ) : (
              history.map((record, index) => (
                <div
                  key={index}
                  style={{
                    background: "#eef5ff",
                    borderLeft: "4px solid #1565d8",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "6px",
                  }}
                >
                  <p><strong>Date:</strong> {record.date}</p>
                  <p><strong>Symptoms:</strong> {record.symptoms}</p>
                  <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                  <p><strong>Treatment:</strong> {record.treatment}</p>
                </div>
              ))
            )}
          </div>

          <h3 style={{ fontSize: "18px" }}>Add New Record</h3>

          <form onSubmit={addRecord} style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Treatment"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            />

            <button
              type="submit"
              style={{
                marginTop: "10px",
                padding: "12px",
                background: "#1565d8",
                color: "#fff",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add Record
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
