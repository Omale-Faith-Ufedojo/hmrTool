import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AllPatientsPage from "./pages/AllPatientsPage";
import MedicalHistory from "./pages/MedicalHistoryPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [user, setUser] = useState(null); // Logged-in user

  // Load patients from localStorage or start with empty array
  const [patients, setPatients] = useState(() => {
    const stored = localStorage.getItem("patients");
    return stored ? JSON.parse(stored) : [];
  });

  const [editPatient, setEditPatient] = useState(null);

  const handleLogin = (email) => setUser({ email });
  const handleLogout = () => setUser(null);

  // Save patients to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  return (
    <>
      {/* Toast container is placed once at the top level */}
      <ToastContainer position="top-right" />

      <Router>
        <Routes>
          {/* Login page */}
          <Route
            path="/"
            element={
              !user ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          {/* Dashboard page */}
          <Route
            path="/dashboard"
            element={
              user ? (
                <DashboardPage
                  user={user}
                  onLogout={handleLogout}
                  patients={patients}
                  setPatients={setPatients}
                  editPatient={editPatient}
                  setEditPatient={setEditPatient}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* All Patients page */}
          <Route
            path="/patients"
            element={
              user ? (
                <AllPatientsPage
                  user={user}
                  onLogout={handleLogout}
                  patients={patients}
                  setPatients={setPatients}
                  setEditPatient={setEditPatient}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Medical History page */}
          <Route
            path="/patients/:id/history"
            element={
              <MedicalHistory
                patients={patients}
                setPatients={setPatients}
              />
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}
