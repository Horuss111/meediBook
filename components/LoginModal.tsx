"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { refreshProfile } = useAuth();
  const [step, setStep] = useState<"email" | "otp" | "name">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendOTP() {
    if (!email.includes("@")) { setError("Please enter a valid email"); return; }
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true, emailRedirectTo: undefined }
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setStep("otp");
    setLoading(false);
  }

  async function verifyOTP() {
    if (otp.length < 6) { setError("Enter the login code"); return; }
    setLoading(true); setError("");
    const { data, error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
    if (error) { setError(error.message); setLoading(false); return; }

    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles").select("full_name").eq("id", data.user.id).single();
      if (!profile?.full_name) {
        setLoading(false);
        setStep("name");
      } else {
        await refreshProfile();
        setLoading(false);
        onClose();
      }
    } else {
      setLoading(false);
    }
  }

  async function saveName() {
    if (!fullName.trim()) { setError("Please enter your name"); return; }
    setLoading(true); setError("");
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").upsert({ id: user.id, email: user.email, full_name: fullName.trim() });
    }
    await refreshProfile();
    setLoading(false);
    onClose();
  }

  const inputStyle = { width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "white" as const, fontSize: 15, outline: "none", fontFamily: "inherit" };
  const btnStyle = { width: "100%", marginTop: 20, padding: "15px", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", border: "none", borderRadius: 12, color: "white" as const, fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, boxShadow: "0 12px 32px rgba(59,130,246,0.35)" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", padding: "20px" }}>
      <div style={{ background: "linear-gradient(160deg, #0d1526, #080f1c)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: "40px 36px", width: "100%", maxWidth: 420, boxShadow: "0 40px 100px rgba(0,0,0,0.6)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.07)", border: "none", color: "white", width: 32, height: 32, borderRadius: 8, fontSize: 18, cursor: "pointer", display: "grid", placeItems: "center" }}>×</button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #020617, #0f172a, #2563eb)", display: "grid", placeItems: "center" }}>
            <div style={{ width: 16, height: 16, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
              {Array(9).fill(0).map((_,i) => <span key={i} style={{ borderRadius: 2, background: "white", opacity: 0.9, display: "block" }} />)}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18 }}>MediBook</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" as const }}>Patient Portal</div>
          </div>
        </div>

        {step === "email" && (
          <>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>Welcome back 👋</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>Enter your email and we'll send you a login code instantly.</p>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#93c5fd", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 8 }}>Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendOTP()} style={inputStyle} />
            {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: 8 }}>{error}</p>}
            <button onClick={sendOTP} disabled={loading} style={{ ...btnStyle, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Sending..." : "Send Login Code →"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>Check your email 📬</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>We sent a login code to <strong style={{ color: "#93c5fd" }}>{email}</strong></p>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#93c5fd", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 8 }}>Login Code</label>
            <input type="text" placeholder="Enter your code" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))} onKeyDown={(e) => e.key === "Enter" && verifyOTP()} style={{ ...inputStyle, fontSize: 22, letterSpacing: "0.3em", textAlign: "center" as const }} />
            {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: 8 }}>{error}</p>}
            <button onClick={verifyOTP} disabled={loading} style={{ ...btnStyle, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Verifying..." : "Verify Code →"}
            </button>
            <button onClick={() => { setStep("email"); setError(""); }} style={{ width: "100%", marginTop: 10, padding: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "rgba(255,255,255,0.5)", fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}>
              ← Use a different email
            </button>
          </>
        )}

        {step === "name" && (
          <>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>One last thing 🎉</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>What's your full name? This helps us personalize your experience.</p>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#93c5fd", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 8 }}>Full Name</label>
            <input type="text" placeholder="Ahmed Mohamed" value={fullName} onChange={(e) => setFullName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && saveName()} style={inputStyle} />
            {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: 8 }}>{error}</p>}
            <button onClick={saveName} disabled={loading} style={{ ...btnStyle, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Saving..." : "Get Started →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
