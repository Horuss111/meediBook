"use client";

import { useState } from "react";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  location: string;
};

const doctors: Doctor[] = [
  { id: 1, name: "Dr. Ahmed Hassan", specialty: "Dentist", rating: 4.9, location: "Cairo" },
  { id: 2, name: "Dr. Salma Ashraf", specialty: "Dermatologist", rating: 4.8, location: "Giza" },
  { id: 3, name: "Dr. Karim Nabil", specialty: "Cardiologist", rating: 4.7, location: "Alexandria" },
  { id: 4, name: "Dr. Laila Naguib", specialty: "Implant Specialist", rating: 4.9, location: "Cairo" },
  { id: 5, name: "Dr. Mohamed Adel", specialty: "Orthopedic", rating: 4.6, location: "Nasr City" },
];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="container" style={{ padding: "80px 0" }}>
        {/* Title */}
        <h1
          style={{
            fontFamily: "Syne",
            fontSize: "48px",
            fontWeight: 900,
            marginBottom: "20px",
            letterSpacing: "-0.03em",
          }}
        >
          Find Your Doctor
        </h1>

        {/* Search */}
        <input
          placeholder="Search doctor or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "16px 20px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "#fff",
            marginBottom: "32px",
            outline: "none",
            backdropFilter: "blur(10px)",
          }}
        />

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: "20px",
          }}
        >
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              style={{
                padding: "22px",
                borderRadius: "24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "0.3s",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              }}
            >
              <h3 style={{ fontFamily: "Syne", fontSize: "20px", fontWeight: 800 }}>
                {doc.name}
              </h3>

              <p style={{ color: "#60a5fa", marginTop: "6px", fontSize: "14px" }}>
                {doc.specialty}
              </p>

              <p style={{ marginTop: "10px", fontSize: "13px", opacity: 0.7 }}>
                📍 {doc.location}
              </p>

              <p style={{ marginTop: "6px", fontSize: "14px" }}>
                ⭐ {doc.rating}
              </p>

              <button
                style={{
                  marginTop: "18px",
                  width: "100%",
                  padding: "12px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(59,130,246,0.3)",
                }}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}