"use client";

import { useState } from "react";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  avatar: string;
  gender: "male" | "female";
  experience: number;
  available: boolean;
  verified: boolean;
};

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ahmed Hassan",
    specialty: "Dentist",
    rating: 4.9,
    location: "Cairo",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    gender: "male",
    experience: 12,
    available: true,
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Salma Ashraf",
    specialty: "Cardiologist",
    rating: 4.8,
    location: "Giza",
    avatar: "/salma.jpg",
    gender: "female",
    experience: 9,
    available: false,
    verified: true,
  },
  {
    id: 3,
    name: "Dr. Karim Nabil",
    specialty: "Neurologist",
    rating: 4.7,
    location: "Alexandria",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    gender: "male",
    experience: 15,
    available: true,
    verified: true,
  },
  {
    id: 4,
    name: "Dr. Laila Naguib",
    specialty: "Implant Specialist",
    rating: 4.9,
    location: "Cairo",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    gender: "female",
    experience: 11,
    available: true,
    verified: true,
  },
  {
    id: 5,
    name: "Dr. Mohamed Adel",
    specialty: "Orthopedic",
    rating: 4.6,
    location: "Nasr City",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    gender: "male",
    experience: 8,
    available: false,
    verified: false,
  },
];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "100px 20px",
        background:
          "radial-gradient(circle at top, rgba(59,130,246,0.15), transparent 40%), #020617",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        
        {/* Header */}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 900,
            marginBottom: "10px",
            letterSpacing: "0.03em",
            textShadow: "0 10px 40px rgba(59,130,246,0.6), 0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          Find Your Doctor
        </h1>

        <p style={{ opacity: 0.6, marginBottom: "40px" }}>
          Book appointments with top doctors in seconds
        </p>

        {/* Search */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "14px",
            borderRadius: "20px",
            marginBottom: "40px",
            backdropFilter: "blur(20px)",
          }}
        >
          <input
            placeholder="Search doctors, specialties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: "24px",
          }}
        >
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              style={{
                padding: "24px",
                borderRadius: "24px",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                transition: "0.3s",
                cursor: "pointer",
                transform: "scale(1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 30px 80px rgba(59,130,246,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Avatar + Status */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid rgba(255,255,255,0.2)",
                    }}
                  />
                  {doc.available && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        width: "12px",
                        height: "12px",
                        background: "#22c55e",
                        borderRadius: "50%",
                        border: "2px solid #020617",
                      }}
                    />
                  )}
                </div>

                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, margin: 0 }}>
                    {doc.name}
                  </h3>
                  <p style={{ fontSize: "13px", opacity: 0.6 }}>
                    {doc.experience}+ years experience
                  </p>
                </div>
              </div>

              {/* Specialty + Verified */}
              <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                  {doc.specialty}
                </span>
                {doc.verified && <span style={{ fontSize: "14px" }}>✔️</span>}
              </div>

              <p style={{ marginTop: "8px", fontSize: "13px", opacity: 0.6 }}>
                📍 {doc.location}
              </p>

              <p style={{ marginTop: "6px" }}>⭐ {doc.rating}</p>

              <button
                onClick={() => {
                  setSelectedDoctor(doc);
                  setShowModal(true);
                }}
                style={{
                  marginTop: "18px",
                  width: "100%",
                  padding: "12px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg,#3b82f6,#2563eb,#1d4ed8)",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "0.3s",
                  boxShadow: "0 10px 30px rgba(59,130,246,0.3)",
                }}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#020617",
              padding: "30px",
              borderRadius: "20px",
              width: "400px",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>
              Book with {selectedDoctor?.name}
            </h2>

            <input
              placeholder="Your Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                background: "#0f172a",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px"
              }}
            />

            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                background: "#0f172a",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px"
              }}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                background: "#0f172a",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px"
              }}
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                background: "#0f172a",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px"
              }}
            />

            <button
              style={{
                  marginTop: "18px",
                  width: "100%",
                  padding: "12px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg,#3b82f6,#2563eb,#1d4ed8)",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "0.3s",
                  boxShadow: "0 10px 30px rgba(59,130,246,0.3)",
              }}
            >
              Confirm Booking
            </button>

            <button
              onClick={() => setShowModal(false)}
              style={{
                  marginTop: "18px",
                  width: "100%",
                  padding: "12px",
                  borderRadius: "14px",
                  background: "transparent",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "0.3s",
                  boxShadow: "0 10px 30px rgba(59,130,246,0.3)",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}