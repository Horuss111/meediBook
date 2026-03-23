"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function UserMenu() {
  const { user, profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!user) return null;

  const firstName = profile?.full_name?.split(" ")[0] || user.email?.split("@")[0] || "User";
  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : firstName[0].toUpperCase();

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 999, padding: "6px 16px 6px 6px",
          cursor: "pointer", transition: "all 0.2s",
          color: "white",
        }}
      >
        {/* Avatar circle */}
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13,
          color: "white", flexShrink: 0,
        }}>
          {initials}
        </div>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 600 }}>
          {firstName}
        </span>
        <span style={{ fontSize: 10, opacity: 0.5 }}>▼</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 10px)", right: 0,
          background: "linear-gradient(160deg, #0d1526, #080f1c)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16, padding: "8px",
          minWidth: 220, zIndex: 999,
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}>
          {/* User info */}
          <div style={{
            padding: "12px 16px 14px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 6,
          }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15 }}>
              {profile?.full_name || firstName}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>
              {user.email}
            </div>
          </div>

          {/* Menu items */}
          {[
            { icon: "👤", label: "My Profile" },
            { icon: "📅", label: "My Appointments" },
            { icon: "⚙️", label: "Settings" },
          ].map((item) => (
            <button key={item.label} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "10px 16px", borderRadius: 10, border: "none",
              background: "transparent", color: "rgba(255,255,255,0.7)",
              fontFamily: "inherit", fontSize: 14, cursor: "pointer",
              transition: "background 0.2s",
              textAlign: "left",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "6px 0" }} />

          {/* Sign out */}
          <button
            onClick={() => { signOut(); setOpen(false); window.location.reload(); }}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "10px 16px", borderRadius: 10, border: "none",
              background: "transparent", color: "#f87171",
              fontFamily: "inherit", fontSize: 14, cursor: "pointer",
              transition: "background 0.2s", textAlign: "left",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontSize: 16 }}>🚪</span>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
