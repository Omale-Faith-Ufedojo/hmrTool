import { useState, useEffect } from "react";

const STORAGE_KEY = "faithmed_patients";

export default function usePatients() {
  const [patients, setPatients] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  }, [patients]);

  const addPatient = (patient) => {
    // ensure every patient has unique id
    if (!patient.id) patient.id = Date.now();
    setPatients((prev) => [...prev, patient]);
  };

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const clearPatients = () => {
    setPatients([]);
  };

  return { patients, addPatient, deletePatient, clearPatients, setPatients };
}
