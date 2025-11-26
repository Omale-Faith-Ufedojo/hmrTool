import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function PatientForm({ editPatient, onAdd, onCancelEdit }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    if (editPatient) {
      setName(editPatient.name || "");
      setAge(editPatient.age || "");
      setPhone(editPatient.phone || "");
      setEmail(editPatient.email || "");
      setDob(editPatient.dob || "");
    } else {
      setName(""); setAge(""); setPhone(""); setEmail(""); setDob("");
    }
  }, [editPatient]);

  // Function to calculate age from DOB
  const calculateAge = (dobValue) => {
    if (!dobValue) return "";
    const birthDate = new Date(dobValue);
    const diffMs = new Date() - birthDate;
    const ageCalc = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
    setAge(ageCalc);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
    calculateAge(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !phone || !email || !dob) {
      toast.error("Please fill in all fields");
      return;
    }

    onAdd({ name, age, phone, email, dob, id: editPatient?.id });
    toast.success(editPatient ? "Patient updated successfully" : "Patient registered successfully");
    setName(""); setAge(""); setPhone(""); setEmail(""); setDob("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="date" placeholder="Date of Birth" value={dob} onChange={handleDobChange} required />
      <input type="number" placeholder="Age" value={age} readOnly /> {/* Age is now read-only */}
      <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit">{editPatient ? "Update Patient" : "Register Patient"}</button>
        {editPatient && <button type="button" onClick={onCancelEdit}>Cancel</button>}
      </div>
    </form>
  );
}
