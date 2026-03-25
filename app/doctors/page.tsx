"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [darkMode, setDarkMode] = useState(true);
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      if (pageRef.current) {
        pageRef.current.style.setProperty("--mouse-x", x.toFixed(4));
        pageRef.current.style.setProperty("--mouse-y", y.toFixed(4));
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(search.toLowerCase())
  );

  if (typeof window !== "undefined" && window.location.pathname === "/admin") {
    return <AdminDashboard />;
  }

  return (
    <div
      ref={pageRef}
      className={`page ${darkMode ? "dark" : "light"}`}
      style={{
        minHeight: "100vh",
        padding: "100px 20px",
        background:
          darkMode
            ? "radial-gradient(circle at top, rgba(59,130,246,0.15), transparent 40%), #020617"
            : "#f8fafc",
        color: darkMode ? "#fff" : "#0b0b0b",
        transition: "0.3s"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "10px 16px",
              borderRadius: "12px",
              border: "none",
              background: darkMode ? "#fff" : "#020617",
              color: darkMode ? "#000" : "#fff",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
        
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
                background: darkMode
                  ? "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
                  : "linear-gradient(145deg, #ffffff, #e2e8f0)",
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
              background: darkMode ? "#020617" : "#ffffff",
              color: darkMode ? "#fff" : "#000",
              padding: "30px",
              borderRadius: "20px",
              width: "400px",
              position: "relative",
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
              onClick={async () => {
                if (!patientName || !phone || !date || !time) {
                  alert("Please fill all fields");
                  return;
                }

                setLoading(true);

                // prevent duplicate booking
                const { data: existing } = await supabase
                  .from("appointments")
                  .select("*")
                  .eq("doctor_name", selectedDoctor?.name)
                  .eq("date", date)
                  .eq("time", time);

                if (existing && existing.length > 0) {
                  setLoading(false);
                  alert("⚠️ This time slot is already booked");
                  return;
                }

                const { error } = await supabase.from("appointments").insert([
                  {
                    doctor_name: selectedDoctor?.name,
                    patient_name: patientName,
                    phone: phone,
                    date: date,
                    time: time,
                  },
                ]);

                setLoading(false);

                if (error) {
                  console.error(error);
                  alert("❌ Booking failed");
                } else {
                  setSuccess(true);

                  // WhatsApp auto message
                  const message = `Hello 👋\nYour booking is confirmed ✅\nDoctor: ${selectedDoctor?.name}\nDate: ${date} ${time}`;
                  const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappURL, "_blank");

                  setTimeout(() => {
                    setShowModal(false);
                    setSuccess(false);
                  }, 2500);
                }
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
                  opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Booking"}
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

            {success && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.85)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
                  zIndex: 10,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#22c55e,#16a34a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "40px",
                      margin: "auto",
                      boxShadow: "0 0 40px rgba(34,197,94,0.6)",
                    }}
                  >
                    ✓
                  </div>
                  <h2 style={{ marginTop: "20px" }}>Booking Confirmed</h2>
                  <p style={{ opacity: 0.6 }}>Redirecting...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div
        style={{
          position: "fixed",
          left: "calc(var(--mouse-x, 0.5) * 100%)",
          top: "calc(var(--mouse-y, 0.5) * 100%)",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.2), transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </div>
  );
}
// --- AdminDashboard component ---
import React from "react";
function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingDash, setLoadingDash] = useState(true);

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setAppointments(data);
    }
    setLoadingDash(false);
  };

  const deleteAppointment = async (id: string) => {
    await supabase.from("appointments").delete().eq("id", id);
    fetchAppointments();
  };

  if (loadingDash) {
    return <div style={{ padding: 40 }}>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 20 }}>
        📊 Admin Dashboard
      </h1>

      <div style={{ display: "grid", gap: 16 }}>
        {appointments.map((a) => (
          <div
            key={a.id}
            style={{
              padding: 20,
              borderRadius: 16,
              background: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 800 }}>{a.patient_name}</div>
              <div style={{ opacity: 0.6 }}>{a.phone}</div>
              <div style={{ color: "#3b82f6" }}>{a.doctor_name}</div>
              <div style={{ fontSize: 13, opacity: 0.6 }}>
                {a.date} • {a.time}
              </div>
            </div>

            <button
              onClick={() => deleteAppointment(a.id)}
              style={{
                background: "#ef4444",
                border: "none",
                padding: "10px 14px",
                borderRadius: 10,
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}