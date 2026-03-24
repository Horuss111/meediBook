"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import LoginModal from "@/components/LoginModal";
import UserMenu from "@/components/UserMenu";

const APP_STORE_URL = "https://apps.apple.com/";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps";
const WHATSAPP_URL = "https://wa.me/201006741810";
const EMAIL = "karimdiab7800@gmail.com";
const PHONE = "+20 100 674 1810";

export default function MediBookWebsiteLandingPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: "⚡", title: "Fast Premium Booking", text: "Search doctors, compare specialists, and reserve appointments through a luxury healthcare experience built for speed and elegance." },
    { icon: "💬", title: "Real-Time Chat Care", text: "Stay connected with clinics and doctors through a polished messaging flow built for trust, clarity, and speed." },
    { icon: "✦", title: "Beautiful Patient Journey", text: "From splash screen to booking confirmation, every touchpoint feels modern, high-end, and easy to navigate." },
    { icon: "🔒", title: "Secure Health Records", text: "Your medical history, prescriptions, and documents stored safely with enterprise-grade encryption and instant access." },
    { icon: "📊", title: "Health Analytics", text: "Track appointments, medications, and health trends with beautiful dashboards designed for clarity and insight." },
    { icon: "🌍", title: "Multi-City Coverage", text: "Find top doctors across Cairo, Alexandria, and major Egyptian cities — all verified and rated by real patients." },
  ];

  const faqs = [
    { q: "Is MediBook free to use?", a: "Yes — our Basic plan is completely free and gives you access to 50+ verified doctors and 1 appointment per month. Upgrade to Pro for unlimited access." },
    { q: "How do I book an appointment?", a: "Simply search for a doctor or specialty, view their availability, and tap 'Book Now'. You'll receive a confirmation instantly via SMS and in-app notification." },
    { q: "Are the doctors verified?", a: "Every doctor on MediBook goes through a rigorous verification process including license checks, credential review, and patient rating monitoring." },
    { q: "Can I cancel or reschedule?", a: "Absolutely. You can cancel or reschedule any appointment up to 2 hours before the scheduled time, directly from the app — no phone calls needed." },
    { q: "Is my health data private?", a: "Yes. We use end-to-end encryption and never sell your data. You have full control over your health records and can export or delete them at any time." },
    { q: "Do you support video consultations?", a: "Yes — Pro and Clinic plans include HD video consultations with doctors, available 24/7 for urgent care and specialist follow-ups." },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif; background: #05070d; color: #ffffff; }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; cursor: pointer; }
        h1, h2, h3, h4 { font-family: 'Syne', ui-sans-serif, system-ui, sans-serif; }
        * { cursor: default; }
        a, button, [role="button"] { cursor: pointer !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050813; }
        ::-webkit-scrollbar-thumb { background: #1d4ed8; border-radius: 3px; }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 12% 6%, rgba(59,130,246,0.14), transparent 24%),
            radial-gradient(circle at 88% 12%, rgba(37,99,235,0.12), transparent 20%),
            radial-gradient(circle at 50% 80%, rgba(29,78,216,0.08), transparent 30%),
            linear-gradient(180deg, #07111f 0%, #02050b 100%);
        }
        .container { width: min(1280px, calc(100% - 40px)); margin: 0 auto; }

        .topbar { position: sticky; top: 0; z-index: 40; backdrop-filter: blur(24px); background: rgba(5,7,13,0.78); border-bottom: 1px solid rgba(255,255,255,0.07); }
        .topbar-inner { display: flex; align-items: center; justify-content: space-between; min-height: 80px; gap: 20px; }
        .brand { display: flex; align-items: center; gap: 14px; transition: opacity 0.2s ease; }
        .brand:hover { opacity: 0.85; }
        .brand-box { width: 44px; height: 44px; border-radius: 13px; display: grid; place-items: center; background: linear-gradient(135deg, #020617 0%, #0f172a 45%, #2563eb 100%); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 10px 28px rgba(37,99,235,0.25); transition: box-shadow 0.2s ease, transform 0.2s ease; flex-shrink: 0; }
        .brand:hover .brand-box { box-shadow: 0 14px 36px rgba(37,99,235,0.42); transform: scale(1.04); }
        .brand-name { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; letter-spacing: -0.04em; }
        .brand-sub { font-size: 10px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.22em; margin-top: 2px; }

        .nav { display: flex; align-items: center; gap: 6px; }
        .nav a { padding: 8px 14px; border-radius: 10px; color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 600; transition: color 0.2s ease, background 0.2s ease; }
        .nav a:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .top-actions { display: flex; align-items: center; gap: 10px; }

        .btn { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 12px 22px; font-size: 14px; font-weight: 700; font-family: 'Syne', sans-serif; transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; cursor: pointer; border: none; }
        .btn:hover { transform: translateY(-2px); }
        .btn:active { transform: translateY(0); }
        .btn-outline { border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.05); color: #fff; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.22); }
        .btn-primary { background: #fff; color: #0b0b0b; box-shadow: 0 14px 38px rgba(255,255,255,0.1); }
        .btn-primary:hover { box-shadow: 0 18px 48px rgba(255,255,255,0.18); }
        .btn-blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #fff; box-shadow: 0 14px 36px rgba(59,130,246,0.32); }
        .btn-blue:hover { box-shadow: 0 18px 48px rgba(59,130,246,0.48); }

        .mobile-toggle { display: none; width: 42px; height: 42px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #fff; font-size: 20px; transition: background 0.2s ease; flex-shrink: 0; }
        .mobile-toggle:hover { background: rgba(255,255,255,0.1); }
        .mobile-menu { display: none; padding: 0 0 16px; }
        .mobile-menu-inner { display: grid; gap: 4px; }
        .mobile-menu-inner a { padding: 12px 16px; border-radius: 12px; color: rgba(255,255,255,0.72); font-size: 15px; font-weight: 600; transition: background 0.2s ease, color 0.2s ease; }
        .mobile-menu-inner a:hover { background: rgba(255,255,255,0.06); color: #fff; }

        .hero { padding: 56px 0 120px; }
        .eyebrow { display: inline-flex; align-items: center; gap: 10px; padding: 9px 16px; border-radius: 999px; background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.22); color: #93c5fd; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; transition: border-color 0.2s ease, background 0.2s ease; }
        .eyebrow:hover { background: rgba(59,130,246,0.14); border-color: rgba(59,130,246,0.38); }
        .eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: #3b82f6; box-shadow: 0 0 14px rgba(59,130,246,0.9); animation: pulse 2s ease-in-out infinite; flex-shrink: 0; }
        @keyframes pulse { 0%, 100% { box-shadow: 0 0 14px rgba(59,130,246,0.9); } 50% { box-shadow: 0 0 28px rgba(59,130,246,1), 0 0 0 6px rgba(59,130,246,0.15); } }

        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 28px; align-items: start; }
        .hero-copy { max-width: 780px; }
        .hero-title { font-family: 'Syne', sans-serif; font-size: clamp(36px,6vw,108px); line-height: 0.95; letter-spacing: -0.06em; font-weight: 900; }
        .hero-highlight { background: linear-gradient(90deg, #dbeafe 0%, #60a5fa 40%, #2563eb 100%); -webkit-background-clip: text; background-clip: text; color: transparent; display: inline; }
        .hero-text { margin-top: 28px; color: rgba(255,255,255,0.62); font-size: 19px; line-height: 1.85; }
        .hero-buttons { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 36px; }

        .hero-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-top: 48px; max-width: 760px; }
        .stat { border-radius: 22px; padding: 22px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); box-shadow: 0 18px 48px rgba(0,0,0,0.22); transition: all 0.25s ease; display: block; }
        .stat:hover { background: rgba(59,130,246,0.08); border-color: rgba(59,130,246,0.28); transform: translateY(-4px); box-shadow: 0 24px 60px rgba(59,130,246,0.18); }
        .stat-value { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 900; letter-spacing: -0.05em; }
        .stat-label { margin-top: 6px; color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 500; }

        .hero-stage-wrap { margin-top: 0; }
        .hero-stage-glow { position: relative; }
        .hero-stage-glow::before { content: ""; position: absolute; inset: -40px; background: radial-gradient(circle at center, rgba(37,99,235,0.22), transparent 55%); filter: blur(40px); z-index: 0; }
        .hero-stage { position: relative; z-index: 1; border-radius: 40px; padding: 12px; background: #080f1c; border: 1px solid rgba(255,255,255,0.07); box-shadow: 0 48px 120px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04); transition: box-shadow 0.3s ease; }
        .hero-stage:hover { box-shadow: 0 56px 140px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.18), inset 0 1px 0 rgba(255,255,255,0.05); }
        .device-frame { position: relative; overflow: hidden; border-radius: 32px; min-height: 720px; background: linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(135deg, #020617 0%, #0c1731 42%, #1e40af 100%); background-size: 33.333% 100%, 100% 100%, 100% 100%; border: 1px solid rgba(255,255,255,0.07); }
        .device-notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 170px; height: 32px; background: #060a12; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; z-index: 3; }
        .device-topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 28px 32px 0; color: rgba(239,246,255,0.9); position: relative; z-index: 2; }
        .device-brand { display: flex; align-items: center; gap: 10px; font-family: 'Syne', sans-serif; font-size: 19px; font-weight: 800; letter-spacing: -0.04em; transition: opacity 0.2s ease; }
        .device-brand:hover { opacity: 0.8; }
        .device-nav { display: flex; gap: 26px; font-size: 14px; color: rgba(219,234,254,0.65); font-weight: 500; }
        .device-nav span { cursor: pointer; transition: color 0.2s ease; }
        .device-nav span::before { content: "•"; margin-right: 7px; color: rgba(147,197,253,0.4); }
        .device-nav span:hover { color: rgba(219,234,254,0.95); }
        .device-pill { padding: 10px 16px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.03); font-size: 13px; font-weight: 600; transition: background 0.2s ease, border-color 0.2s ease; white-space: nowrap; }
        .device-pill:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.35); }
        .device-content { display: grid; grid-template-columns: 1.08fr 0.92fr; gap: 24px; padding: 32px 32px 28px; min-height: 640px; position: relative; z-index: 2; }
        .device-copy { display: flex; flex-direction: column; justify-content: space-between; }
        .device-intro { max-width: 300px; color: rgba(219,234,254,0.72); font-size: 20px; line-height: 1.4; font-weight: 300; }
        .device-headline { margin-top: 68px; max-width: 500px; font-family: 'Syne', sans-serif; font-size: clamp(52px,6vw,90px); line-height: 0.92; letter-spacing: -0.065em; font-weight: 300; color: #dbeafe; }
        .device-headline strong { display: block; color: white; font-weight: 900; }
        .device-footer-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; padding-top: 24px; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); }
        .device-footer-item { padding: 10px; border-radius: 12px; transition: background 0.2s ease; font-size: 14px; line-height: 1.5; color: rgba(239,246,255,0.78); }
        .device-footer-item:hover { background: rgba(255,255,255,0.06); }
        .device-footer-item span { display: block; margin-top: 4px; font-size: 11px; color: rgba(191,219,254,0.5); letter-spacing: 0.08em; text-transform: uppercase; }
        .device-visual { display: grid; grid-template-columns: 1fr 230px; gap: 16px; align-items: stretch; }

        .implant-zone { position: relative; min-height: 520px; border-radius: 26px; background: linear-gradient(180deg, rgba(96,165,250,0.07), rgba(2,6,23,0.18)); overflow: hidden; }
        .implant-glow { position: absolute; left: 50%; bottom: 90px; transform: translateX(-50%); width: 200px; height: 70px; background: radial-gradient(circle, rgba(59,130,246,0.32), transparent 70%); filter: blur(16px); }
        .implant-shadow { position: absolute; left: 50%; bottom: 72px; transform: translateX(-50%); width: 150px; height: 20px; border-radius: 999px; background: rgba(0,0,0,0.26); filter: blur(10px); }
        .implant { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); animation: floatLuxury 6s ease-in-out infinite; }
        .implant-tooth { width: 136px; height: 160px; border-radius: 44% 44% 36% 36% / 30% 30% 46% 46%; background: radial-gradient(circle at 34% 28%, #f0f8ff 0%, #dbeafe 34%, #60a5fa 68%, #1e3a8a 100%); box-shadow: inset -12px -18px 28px rgba(15,23,42,0.28), 0 18px 42px rgba(96,165,250,0.18); }
        .implant-neck { width: 84px; height: 22px; margin: -5px auto 0; border-radius: 999px; background: linear-gradient(180deg, #0f172a 0%, #020617 100%); }
        .implant-screw { width: 74px; height: 260px; margin: 0 auto; border-radius: 16px 16px 40px 40px; background: repeating-linear-gradient(to bottom, #1d4ed8 0px, #1d4ed8 7px, #0f172a 7px, #0f172a 15px); box-shadow: inset 8px 0 18px rgba(125,211,252,0.16), inset -8px 0 18px rgba(2,6,23,0.28), 0 14px 32px rgba(0,0,0,0.3); }

        .side-cards { display: grid; gap: 12px; }
        .doctor-card { overflow: hidden; border-radius: 22px; border: 1px solid rgba(255,255,255,0.07); background: rgba(10,10,10,0.2); min-height: 158px; display: flex; flex-direction: column; justify-content: flex-end; position: relative; transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease; }
        .doctor-card:hover { border-color: rgba(59,130,246,0.35); transform: scale(1.02); box-shadow: 0 16px 40px rgba(59,130,246,0.2); }
        .doctor-portrait { position: absolute; inset: 0; background: radial-gradient(circle at 50% 20%, rgba(255,255,255,0.13), transparent 26%), linear-gradient(180deg, #172033 0%, #08111f 62%, #04070d 100%); }
        .doctor-portrait.light { background: radial-gradient(circle at 50% 20%, rgba(255,255,255,0.16), transparent 26%), linear-gradient(180deg, #24314a 0%, #0b1320 64%, #04070d 100%); }
        .doctor-info { position: relative; z-index: 1; padding: 14px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%); }
        .doctor-name { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; }
        .doctor-role { margin-top: 3px; color: rgba(147,197,253,0.75); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; }

        .section { padding: 100px 0; }
        .section-head { max-width: 860px; }
        .section-label { color: #93c5fd; font-size: 11px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; }
        .section-title { margin: 14px 0 0; font-family: 'Syne', sans-serif; font-size: clamp(28px,4vw,58px); line-height: 1.05; letter-spacing: -0.04em; font-weight: 900; }
        .section-text { margin-top: 18px; max-width: 760px; color: rgba(255,255,255,0.6); font-size: 18px; line-height: 1.9; }

        .features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 48px; }
        .feat-card { border-radius: 26px; padding: 26px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); cursor: pointer; transition: all 0.25s ease; position: relative; overflow: hidden; }
        .feat-card::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 30% 30%, rgba(59,130,246,0.1), transparent 60%); opacity: 0; transition: opacity 0.3s ease; }
        .feat-card:hover::before, .feat-card.active::before { opacity: 1; }
        .feat-card:hover, .feat-card.active { background: rgba(59,130,246,0.07); border-color: rgba(59,130,246,0.28); transform: translateY(-6px); box-shadow: 0 30px 70px rgba(59,130,246,0.18); }
        .feat-icon { width: 52px; height: 52px; border-radius: 16px; display: grid; place-items: center; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); font-size: 22px; box-shadow: 0 10px 28px rgba(59,130,246,0.35); transition: transform 0.2s ease; }
        .feat-card:hover .feat-icon { transform: scale(1.1) rotate(-4deg); }
        .feat-title { margin-top: 20px; font-family: 'Syne', sans-serif; font-size: 22px; line-height: 1.1; letter-spacing: -0.03em; font-weight: 800; }
        .feat-text { margin-top: 12px; color: rgba(255,255,255,0.58); font-size: 15px; line-height: 1.85; }

        .split-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
        .panel { border-radius: 30px; padding: 34px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); cursor: pointer; transition: all 0.25s ease; position: relative; overflow: hidden; }
        .panel::after { content: "→"; position: absolute; bottom: 28px; right: 28px; font-size: 20px; color: rgba(255,255,255,0.2); transition: color 0.2s ease, transform 0.2s ease; }
        .panel:hover::after { color: #60a5fa; transform: translateX(4px); }
        .panel:hover { background: rgba(59,130,246,0.06); border-color: rgba(59,130,246,0.24); transform: translateY(-4px); }
        .panel-label { color: #93c5fd; font-size: 11px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; }
        .panel-title { margin-top: 12px; font-family: 'Syne', sans-serif; font-size: clamp(22px,2.5vw,30px); line-height: 1.1; letter-spacing: -0.04em; font-weight: 900; }
        .panel-text { margin-top: 14px; color: rgba(255,255,255,0.58); font-size: 15px; line-height: 1.85; }

        .testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; margin-top: 48px; }
        .testi-card { border-radius: 28px; padding: 30px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); cursor: pointer; transition: all 0.25s ease; display: block; }
        .testi-card:hover { background: rgba(59,130,246,0.06); border-color: rgba(59,130,246,0.24); transform: translateY(-5px); box-shadow: 0 30px 70px rgba(59,130,246,0.16); }
        .testi-stars { display: flex; gap: 4px; margin-bottom: 18px; }
        .testi-star { color: #fbbf24; font-size: 15px; transition: transform 0.15s ease; }
        .testi-star:hover { transform: scale(1.3); }
        .testi-quote { font-size: 16px; line-height: 1.82; color: rgba(255,255,255,0.75); font-style: italic; }
        .testi-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 22px 0; }
        .testi-name { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; }
        .testi-role { font-size: 12px; color: rgba(147,197,253,0.65); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.1em; }

        .pricing-section { padding: 100px 0; position: relative; overflow: hidden; background: linear-gradient(180deg, #080808 0%, #020b18 40%, #030f22 70%, #080808 100%); }
        .pricing-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,120,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,120,255,0.06) 1px, transparent 1px); background-size: 48px 48px; z-index: 0; }
        .pricing-glow { position: absolute; top: 8%; left: 50%; transform: translateX(-50%); width: 800px; height: 320px; background: radial-gradient(ellipse, rgba(0,100,255,0.15) 0%, transparent 70%); filter: blur(50px); z-index: 0; }
        .pricing-inner { position: relative; z-index: 1; }
        .pricing-header { text-align: center; margin-bottom: 60px; }
        .pricing-eyebrow { display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px; border-radius: 999px; border: 1px solid rgba(0,140,255,0.28); background: rgba(0,100,255,0.08); color: #7dc6ff; font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 24px; transition: background 0.2s ease, border-color 0.2s ease; }
        .pricing-eyebrow:hover { background: rgba(0,100,255,0.14); border-color: rgba(0,140,255,0.44); }
        .pricing-dot { width: 7px; height: 7px; border-radius: 50%; background: #3b9eff; box-shadow: 0 0 14px rgba(59,158,255,0.9); animation: pulse 2s ease-in-out infinite; flex-shrink: 0; }
        .pricing-title { font-family: 'Syne', sans-serif; font-size: clamp(32px,5vw,64px); font-weight: 900; letter-spacing: -0.05em; line-height: 1; color: #fff; }
        .pricing-highlight { background: linear-gradient(90deg, #60b8ff 0%, #2979ff 55%, #0047cc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .pricing-subtitle { margin: 20px auto 0; color: rgba(255,255,255,0.5); font-size: 18px; line-height: 1.8; max-width: 540px; }
        .pricing-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 24px; align-items: stretch; }
        .pricing-note { margin-top: 44px; text-align: center; color: rgba(255,255,255,0.32); font-size: 14px; }
        .pricing-note a { color: #60a5fa; text-decoration: underline; text-underline-offset: 3px; transition: color 0.2s ease; }
        .pricing-note a:hover { color: #93c5fd; }

        .faq-section { padding: 100px 0; }
        .faq-list { margin-top: 48px; display: grid; gap: 12px; max-width: 860px; }
        .faq-item { border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); overflow: hidden; transition: border-color 0.2s ease; }
        .faq-item:hover { border-color: rgba(59,130,246,0.3); }
        .faq-item.open { border-color: rgba(59,130,246,0.4); background: rgba(59,130,246,0.06); }
        .faq-q { display: flex; align-items: center; justify-content: space-between; padding: 22px 24px; cursor: pointer; gap: 16px; font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; transition: color 0.2s ease; }
        .faq-q:hover { color: #93c5fd; }
        .faq-item.open .faq-q { color: #60a5fa; }
        .faq-chevron { width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0; background: rgba(255,255,255,0.06); display: grid; place-items: center; font-size: 14px; transition: transform 0.3s ease, background 0.2s ease; }
        .faq-item.open .faq-chevron { transform: rotate(180deg); background: rgba(59,130,246,0.2); }
        .faq-a { padding: 0 24px; max-height: 0; overflow: hidden; color: rgba(255,255,255,0.62); font-size: 15px; line-height: 1.85; transition: max-height 0.4s ease, padding 0.3s ease; }
        .faq-item.open .faq-a { max-height: 200px; padding-bottom: 22px; }

        .download-strip { border-radius: 38px; padding: 48px; background: linear-gradient(135deg, #020617 0%, #08111f 55%, #0f172a 100%); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 30px 70px rgba(0,0,0,0.32); display: grid; grid-template-columns: 1fr auto; gap: 30px; align-items: center; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .download-strip:hover { border-color: rgba(59,130,246,0.24); box-shadow: 0 40px 90px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.12); }
        .download-buttons { display: flex; flex-wrap: wrap; gap: 14px; }
        .store-btn { display: inline-flex; align-items: center; gap: 12px; padding: 14px 22px; border-radius: 16px; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; transition: all 0.22s ease; cursor: pointer; border: none; }
        .store-btn:hover { transform: translateY(-3px); }
        .store-btn-white { background: #fff; color: #0b0b0b; box-shadow: 0 12px 32px rgba(255,255,255,0.12); }
        .store-btn-white:hover { box-shadow: 0 18px 44px rgba(255,255,255,0.2); }
        .store-btn-dark { background: rgba(255,255,255,0.07); color: #fff; border: 1px solid rgba(255,255,255,0.14); }
        .store-btn-dark:hover { background: rgba(255,255,255,0.12); }
        .store-btn-icon { font-size: 20px; }
        .store-btn-text { display: flex; flex-direction: column; align-items: flex-start; }
        .store-btn-sub { font-size: 10px; font-weight: 500; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.08em; }
        .store-btn-label { font-size: 15px; font-weight: 800; margin-top: 1px; }

        .footer-wrap { padding: 0 0 40px; }
        .footer-box { border-radius: 32px; padding: 40px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); }
        .footer-grid { display: grid; grid-template-columns: 1.4fr 0.8fr 0.8fr; gap: 36px; }
        .footer-links { display: flex; flex-direction: column; gap: 6px; margin-top: 16px; }
        .footer-links a { color: rgba(255,255,255,0.55); font-size: 14px; font-weight: 500; padding: 7px 10px; border-radius: 8px; margin-left: -10px; transition: color 0.2s ease, background 0.2s ease; display: inline-block; }
        .footer-links a:hover { color: #fff; background: rgba(255,255,255,0.05); }
        .footer-contact { display: flex; flex-direction: column; gap: 6px; margin-top: 16px; }
        .footer-contact a { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.55); font-size: 14px; font-weight: 500; padding: 8px 12px; border-radius: 10px; margin-left: -12px; transition: all 0.2s ease; }
        .footer-contact a:hover { color: #fff; background: rgba(59,130,246,0.08); }
        .footer-contact-icon { font-size: 16px; }
        .footer-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 28px 0 20px; }
        .footer-note { display: flex; justify-content: space-between; gap: 16px; color: rgba(255,255,255,0.35); font-size: 13px; flex-wrap: wrap; }
        .footer-note a { color: rgba(147,197,253,0.7); transition: color 0.2s ease; }
        .footer-note a:hover { color: #93c5fd; }

        .floating-whatsapp { position: fixed; left: 22px; bottom: 22px; z-index: 60; display: flex; align-items: center; gap: 10px; border-radius: 999px; padding: 14px 20px; background: #25d366; color: white; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 800; box-shadow: 0 16px 44px rgba(37,211,102,0.4); transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .floating-whatsapp:hover { transform: translateY(-3px); box-shadow: 0 22px 56px rgba(37,211,102,0.55); }

        @keyframes floatLuxury { 0%, 100% { transform: translate(-50%,-50%) translateY(0); } 50% { transform: translate(-50%,-50%) translateY(-18px); } }
        @keyframes splashPulse { 0%, 100% { opacity: .42; transform: scale(.93); } 50% { opacity: 1; transform: scale(1); } }
        .splash-pulse { animation: splashPulse 1.5s ease-in-out infinite; }

        @media (max-width: 1100px) {
          .nav, .top-actions { display: none; }
          .mobile-toggle { display: inline-grid; place-items: center; }
          .mobile-menu { display: block; }
          .hero-grid { grid-template-columns: 1fr; }
          .hero-stage-wrap { display: none; }
          .features-grid { grid-template-columns: repeat(2,1fr); }
          .testi-grid { grid-template-columns: repeat(2,1fr); }
          .split-panel { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .download-strip { grid-template-columns: 1fr; }
          .download-buttons { justify-content: flex-start; }
        }

        @media (max-width: 760px) {
          .container { width: min(100% - 24px, 1280px); }
          .hero { padding: 40px 0 80px; }
          .hero-title { font-size: clamp(36px, 10vw, 60px); }
          .hero-text { font-size: 16px; }
          .hero-stats { grid-template-columns: repeat(3,1fr); gap: 10px; }
          .stat { padding: 16px 12px; }
          .stat-value { font-size: 26px; }
          .stat-label { font-size: 11px; }
          .hero-buttons { gap: 10px; }
          .hero-buttons .btn { padding: 11px 18px; font-size: 13px; }
          .features-grid { grid-template-columns: 1fr; }
          .testi-grid { grid-template-columns: 1fr; }
          .split-panel { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; }
          .footer-box { padding: 28px 20px; }
          .section { padding: 60px 0; }
          .download-strip { padding: 28px 20px; border-radius: 24px; }
          .pricing-cards { grid-template-columns: 1fr; }
          .footer-note { flex-direction: column; }
          .faq-q { font-size: 15px; padding: 18px 16px; }
          .faq-a { padding: 0 16px; }
          .faq-item.open .faq-a { padding-bottom: 18px; }
          .floating-whatsapp { padding: 12px 16px; font-size: 13px; bottom: 16px; left: 16px; }
        }

        @media (max-width: 480px) {
          .hero-stats { grid-template-columns: 1fr 1fr; }
          .topbar-inner { min-height: 64px; }
          .brand-name { font-size: 20px; }
          .brand-sub { display: none; }
        }
      `}</style>

      {showSplash && <SplashOverlay />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      <div className="page">
        <header className="topbar">
          <div className="container topbar-inner">
            <a href="#home" className="brand">
              <div className="brand-box"><BrandMark /></div>
              <div>
                <div className="brand-name">MediBook</div>
                <div className="brand-sub">Ultra luxury healthcare</div>
              </div>
            </a>
            <nav className="nav">
              {["features","showcase","testimonials","pricing","faq","download","contact"].map((id) => (
                <a key={id} href={`#${id}`}>{id.charAt(0).toUpperCase() + id.slice(1)}</a>
              ))}
            </nav>

            {/* ✅ UPDATED: Professional UserMenu dropdown when logged in */}
            <div className="top-actions">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-outline">WhatsApp</a>
              {user ? (
                <UserMenu />
              ) : (
                <button onClick={() => setShowLogin(true)} className="btn btn-blue">
                  Login
                </button>
              )}
            </div>

            <button className="mobile-toggle" onClick={() => setMobileMenuOpen((v) => !v)} aria-label="Toggle menu">
              {mobileMenuOpen ? "×" : "☰"}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="container mobile-menu">
              <div className="mobile-menu-inner">
                {["features","showcase","testimonials","pricing","faq","download","contact"].map((id) => (
                  <a key={id} href={`#${id}`} onClick={() => setMobileMenuOpen(false)}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                ))}
                {user ? (
                  <button onClick={() => { signOut(); window.location.reload(); }} style={{ textAlign: "left", padding: "12px 16px", borderRadius: 12, color: "#f87171", background: "transparent", border: "none", fontSize: 15, fontWeight: 600 }}>
                    Sign Out
                  </button>
                ) : (
                  <button onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }} style={{ textAlign: "left", padding: "12px 16px", borderRadius: 12, color: "#93c5fd", background: "transparent", border: "none", fontSize: 15, fontWeight: 600 }}>
                    Login →
                  </button>
                )}
              </div>
            </div>
          )}
        </header>

        <main>
          <section id="home" className="hero">
            <div className="container">
              <a href="#features" className="eyebrow">
                <span className="eyebrow-dot" />
                Ultra luxury medical interface
              </a>
              <div className="hero-grid">
                <div className="hero-copy">
                  <h1 className="hero-title">
                    Modern care,<br />designed to{" "}
                    <span className="hero-highlight">impress.</span>
                  </h1>
                  <p className="hero-text">Inspired by cinematic product design, bold luxury interfaces, and 3D presentation, MediBook is built to feel new, premium, unforgettable, and instantly high-end.</p>
                  <div className="hero-buttons">
                    <a href="#download" className="btn btn-primary">Download App</a>
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-outline">Talk on WhatsApp</a>
                    <a href="#features" className="btn btn-outline">Explore Features</a>
                  </div>
                  <div className="hero-stats">
                    <a href="#features" className="stat"><div className="stat-value">120+</div><div className="stat-label">Top Doctors</div></a>
                    <a href="#download" className="stat"><div className="stat-value">24/7</div><div className="stat-label">Patient Support</div></a>
                    <a href="#testimonials" className="stat"><div className="stat-value">4.9★</div><div className="stat-label">Average Rating</div></a>
                  </div>
                </div>
                <div className="hero-stage-wrap">
                  <div className="hero-stage-glow">
                    <div className="hero-stage">
                      <div className="device-frame">
                        <div className="device-notch" />
                        <div className="device-topbar">
                          <a href="#home" className="device-brand"><BrandMark /><span>MediBook</span></a>
                          <div className="device-nav">
                            {["Services","Implants","Price","Preventive Care"].map((s) => (
                              <span key={s} role="button" onClick={() => {}}>{s}</span>
                            ))}
                          </div>
                          <a href="#download" className="device-pill">Health Check</a>
                        </div>
                        <div className="device-content">
                          <div className="device-copy">
                            <div>
                              <p className="device-intro">From preventive care to advanced consultation, a more modern and luxurious approach to digital healthcare.</p>
                              <div className="device-headline">Modern care for<strong>a Perfect Experience</strong></div>
                            </div>
                            <div className="device-footer-row">
                              <a href="#testimonials" className="device-footer-item">Best Product<span>2026</span></a>
                              <a href="#contact" className="device-footer-item">Cairo, Egypt<span>GMT +2</span></a>
                              <a href="#features" className="device-footer-item">Advanced Medical<span>Technology</span></a>
                            </div>
                          </div>
                          <div className="device-visual">
                            <div className="implant-zone">
                              <div className="implant-glow" />
                              <div className="implant-shadow" />
                              <div className="implant">
                                <div className="implant-tooth" />
                                <div className="implant-neck" />
                                <div className="implant-screw" />
                              </div>
                            </div>
                            <div className="side-cards">
                              <DoctorCard name="Dr. Salma Ashraf" role="Doctor" light href="#showcase" />
                              <DoctorCard name="Dr. Karim Hassan" role="Oral Surgeon" href="#showcase" />
                              <DoctorCard name="Dr. Laila Naguib" role="Implant Specialist" light href="#showcase" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="section">
            <div className="container">
              <div className="section-head">
                <div className="section-label">Features</div>
                <h2 className="section-title">Everything you need for premium care.</h2>
                <p className="section-text">MediBook combines a luxury booking flow, real-time doctor communication, and beautiful patient journeys into one seamless platform.</p>
              </div>
              <div className="features-grid">
                {features.map((f, i) => (
                  <div key={f.title} className={`feat-card${activeFeature === i ? " active" : ""}`} onClick={() => setActiveFeature(i)} role="button" tabIndex={0}>
                    <div className="feat-icon">{f.icon}</div>
                    <div className="feat-title">{f.title}</div>
                    <p className="feat-text">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="showcase" className="section" style={{paddingTop:0}}>
            <div className="container">
              <div className="section-head">
                <div className="section-label">Showcase</div>
                <h2 className="section-title">Built for patients. Loved by clinics.</h2>
              </div>
              <div className="split-panel">
                <a href="#download" className="panel">
                  <div className="panel-label">For Patients</div>
                  <div className="panel-title">Book the right doctor in seconds.</div>
                  <p className="panel-text">Browse verified doctors, read reviews, compare availability, and confirm appointments — all from one elegant interface.</p>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="panel">
                  <div className="panel-label">For Clinics</div>
                  <div className="panel-title">A premium digital presence that converts.</div>
                  <p className="panel-text">Give your clinic a luxury brand experience online. Manage schedules, communicate with patients, and grow your practice effortlessly.</p>
                </a>
              </div>
            </div>
          </section>

          <section id="testimonials" className="section">
            <div className="container">
              <div className="section-head">
                <div className="section-label">Testimonials</div>
                <h2 className="section-title">Loved by patients, trusted by clinics.</h2>
                <p className="section-text">Real words from real patients and clinic partners who use MediBook every day.</p>
              </div>
              <div className="testi-grid">
                {[
                  {name:"Tarek",role:"Patient",quote:"The design feels premium and calm. Booking an appointment was faster than any medical app I used before."},
                  {name:"Dr. Mohamed H.",role:"Clinic Partner",quote:"MediBook gives our clinic a luxury digital presence while keeping the experience simple for patients."},
                  {name:"Karim Diab",role:"Founder",quote:"MediBook was founded to make healthcare feel modern, elegant, and smooth on both mobile and web."},
                ].map((t) => (
                  <a key={t.name} href={`mailto:${EMAIL}`} className="testi-card">
                    <div className="testi-stars">{Array(5).fill(0).map((_,i) => <span key={i} className="testi-star">★</span>)}</div>
                    <div className="testi-quote">"{t.quote}"</div>
                    <div className="testi-divider" />
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="pricing-section">
            <div className="pricing-grid-bg" />
            <div className="pricing-glow" />
            <div className="container pricing-inner">
              <div className="pricing-header">
                <a href="#download" className="pricing-eyebrow"><span className="pricing-dot" />Transparent Pricing</a>
                <h2 className="pricing-title">Plans built for<span className="pricing-highlight"> every patient.</span></h2>
                <p className="pricing-subtitle">No hidden fees. Cancel anytime. Choose the plan that fits your care needs.</p>
              </div>
              <div className="pricing-cards">
                <PricingCard badge={null} name="Basic" price="Free" period="" description="Perfect for new patients exploring MediBook." accent="#3b82f6" featured={false} features={["Browse 50+ verified doctors","1 appointment / month","Basic chat support","Health tips feed","Profile & history"]} cta="Get Started" ctaHref="#download" />
                <PricingCard badge="Most Popular" name="Pro" price="$12" period="/month" description="Full access to premium care and priority booking." accent="#2979ff" featured={true} features={["Unlimited appointments","Priority doctor matching","Real-time video consultations","24/7 live chat support","Health analytics dashboard","Prescription reminders"]} cta="Start Free Trial" ctaHref="#download" />
                <PricingCard badge={null} name="Clinic" price="$49" period="/month" description="For clinics and medical teams managing patients." accent="#0ea5e9" featured={false} features={["Everything in Pro","Up to 10 doctor profiles","Team dashboard & analytics","Custom clinic branding","API & EHR integrations","Dedicated account manager"]} cta="Contact Sales" ctaHref={`mailto:${EMAIL}`} />
              </div>
              <p className="pricing-note">All plans include a 14-day free trial. No credit card required. <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Questions? Chat with us →</a></p>
            </div>
          </section>

          <section id="faq" className="faq-section">
            <div className="container">
              <div className="section-head">
                <div className="section-label">FAQ</div>
                <h2 className="section-title">Got questions? We have answers.</h2>
                <p className="section-text">Everything you need to know about MediBook. Still have questions? <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{color:"#60a5fa", textDecoration:"underline", textUnderlineOffset:"3px"}}>Chat with us</a>.</p>
              </div>
              <div className="faq-list">
                {faqs.map((item, i) => (
                  <div key={i} className={`faq-item${activeFaq === i ? " open" : ""}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                    <div className="faq-q" role="button" tabIndex={0}><span>{item.q}</span><span className="faq-chevron">▾</span></div>
                    <div className="faq-a">{item.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="download" className="section">
            <div className="container">
              <div className="download-strip">
                <div>
                  <div className="section-label">Download App</div>
                  <h2 style={{fontFamily:"'Syne',sans-serif",margin:"12px 0 0",fontSize:"clamp(22px,3vw,42px)",fontWeight:900,letterSpacing:"-0.04em",lineHeight:1.1}}>
                    Bring the premium MediBook<br />experience to every patient.
                  </h2>
                  <p style={{marginTop:14,color:"rgba(255,255,255,0.55)",fontSize:16,lineHeight:1.85,maxWidth:480}}>
                    Download the app to discover doctors, book appointments, manage care, and enjoy the same elegant experience as the website.
                  </p>
                </div>
                <div className="download-buttons">
                  <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="store-btn store-btn-white">
                    <span className="store-btn-icon">🍎</span>
                    <span className="store-btn-text"><span className="store-btn-sub">Download on the</span><span className="store-btn-label">App Store</span></span>
                  </a>
                  <a href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer" className="store-btn store-btn-dark">
                    <span className="store-btn-icon">▶</span>
                    <span className="store-btn-text"><span className="store-btn-sub">Get it on</span><span className="store-btn-label">Google Play</span></span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="footer-wrap">
          <div className="container">
            <div className="footer-box">
              <div className="footer-grid">
                <div>
                  <a href="#home" className="brand">
                    <div className="brand-box"><BrandMark /></div>
                    <div><div className="brand-name">MediBook</div><div className="brand-sub">Ultra luxury healthcare</div></div>
                  </a>
                  <p style={{marginTop:18,color:"rgba(219,234,254,0.55)",lineHeight:1.85,fontSize:15,maxWidth:300}}>
                    Premium digital healthcare platform delivering elegant booking, modern clinic presence, and a luxury patient experience.
                  </p>
                  <div style={{marginTop:20,display:"flex",gap:12,flexWrap:"wrap"}}>
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-blue" style={{padding:"10px 18px",fontSize:13}}>💬 WhatsApp</a>
                    <a href={`mailto:${EMAIL}`} className="btn btn-outline" style={{padding:"10px 18px",fontSize:13}}>✉ Email Us</a>
                  </div>
                </div>
                <div>
                  <div className="section-label">Quick Links</div>
                  <nav className="footer-links">
                    {[["Home","#home"],["Features","#features"],["Showcase","#showcase"],["Testimonials","#testimonials"],["Pricing","#pricing"],["FAQ","#faq"],["Download","#download"]].map(([label,href]) => (
                      <a key={href} href={href}>{label}</a>
                    ))}
                  </nav>
                </div>
                <div>
                  <div className="section-label">Contact</div>
                  <div className="footer-contact">
                    <a href={`mailto:${EMAIL}`}><span className="footer-contact-icon">✉</span>{EMAIL}</a>
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><span className="footer-contact-icon">💬</span>{PHONE}</a>
                    <a href="https://maps.google.com/?q=Cairo,Egypt" target="_blank" rel="noreferrer"><span className="footer-contact-icon">📍</span>Cairo, Egypt</a>
                    <a href={APP_STORE_URL} target="_blank" rel="noreferrer"><span className="footer-contact-icon">🍎</span>App Store</a>
                    <a href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer"><span className="footer-contact-icon">▶</span>Google Play</a>
                  </div>
                </div>
              </div>
              <div className="footer-divider" />
              <div className="footer-note">
                <span>© 2026 MediBook. All rights reserved.</span>
                <span>
                  <a href={`mailto:${EMAIL}?subject=Privacy Policy`}>Privacy Policy</a>
                  {" · "}
                  <a href={`mailto:${EMAIL}?subject=Terms of Service`}>Terms of Service</a>
                  {" · "}Designed in Cairo, Egypt
                </span>
              </div>
            </div>
          </div>
        </footer>

        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="floating-whatsapp">
          <span>💬</span> WhatsApp Us
        </a>
      </div>
    </>
  );
}

function SplashOverlay() {
  return (
    <div style={{position:"fixed",inset:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",background:"#05070d"}}>
      <div style={{textAlign:"center"}}>
        <div className="splash-pulse" style={{width:96,height:96,margin:"0 auto",borderRadius:24,display:"grid",placeItems:"center",background:"linear-gradient(135deg,#020617 0%,#0f172a 45%,#2563eb 100%)",boxShadow:"0 24px 64px rgba(37,99,235,0.38)"}}>
          <BrandMark />
        </div>
        <div style={{marginTop:20,fontFamily:"'Syne',sans-serif",fontSize:30,fontWeight:900,letterSpacing:"-0.04em"}}>MediBook</div>
        <div style={{marginTop:8,fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:"0.2em",textTransform:"uppercase"}}>Ultra luxury healthcare</div>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <div style={{width:18,height:18,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2.5}}>
      {Array.from({length:9}).map((_,i) => (
        <span key={i} style={{borderRadius:3,background:"white",opacity:0.92,display:"block"}} />
      ))}
    </div>
  );
}

function DoctorCard({name,role,light,href}:{name:string;role:string;light?:boolean;href:string}) {
  return (
    <a href={href} className="doctor-card">
      <div className={"doctor-portrait"+(light?" light":"")} />
      <div className="doctor-info">
        <div className="doctor-name">{name}</div>
        <div className="doctor-role">{role}</div>
      </div>
    </a>
  );
}

function PricingCard({badge,name,price,period,description,accent,featured,features,cta,ctaHref}:{badge:string|null;name:string;price:string;period:string;description:string;accent:string;featured:boolean;features:string[];cta:string;ctaHref:string}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{position:"relative",borderRadius:32,padding:featured?2:1,background:featured?`linear-gradient(135deg,${accent},#0047cc,#001a66)`:"rgba(255,255,255,0.07)",boxShadow:featured?`0 44px 100px rgba(41,121,255,0.28)`:"0 24px 60px rgba(0,0,0,0.3)",transform:featured?"scale(1.04)":"scale(1)",zIndex:featured?2:1}}>
      {badge&&<div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(90deg,${accent},#0047cc)`,color:"#fff",fontSize:11,fontWeight:900,letterSpacing:"0.18em",textTransform:"uppercase" as const,padding:"6px 18px",borderRadius:999,whiteSpace:"nowrap" as const,boxShadow:`0 8px 24px rgba(41,121,255,0.4)`,zIndex:3,fontFamily:"'Syne',sans-serif"}}>{badge}</div>}
      <div style={{borderRadius:31,padding:"32px 28px",background:featured?"linear-gradient(180deg,#050e1f,#030b1a)":"linear-gradient(180deg,#070f1c,#040a14)",height:"100%",display:"flex",flexDirection:"column"}}>
        <div style={{display:"inline-block",background:`rgba(59,130,246,0.12)`,border:`1px solid ${accent}44`,borderRadius:12,padding:"6px 14px",color:accent,fontSize:13,fontWeight:800,letterSpacing:"0.08em",marginBottom:20,alignSelf:"flex-start",fontFamily:"'Syne',sans-serif"}}>{name}</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:4,marginBottom:12}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:56,fontWeight:900,letterSpacing:"-0.05em",lineHeight:1,color:"#fff"}}>{price}</span>
          {period&&<span style={{fontSize:16,color:"rgba(255,255,255,0.42)",fontWeight:500,marginBottom:10}}>{period}</span>}
        </div>
        <p style={{margin:"0 0 24px",color:"rgba(255,255,255,0.5)",fontSize:15,lineHeight:1.75}}>{description}</p>
        <div style={{height:1,background:"rgba(255,255,255,0.07)",marginBottom:22}}/>
        <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:12,flex:1}}>
          {features.map((f)=>(
            <li key={f} style={{display:"flex",alignItems:"flex-start",gap:10,color:"rgba(255,255,255,0.75)",fontSize:15}}>
              <span style={{flexShrink:0,marginTop:2,width:18,height:18,borderRadius:"50%",background:`${accent}22`,border:`1px solid ${accent}66`,display:"grid",placeItems:"center",fontSize:10,color:accent,fontWeight:900}}>✓</span>{f}
            </li>
          ))}
        </ul>
        <a href={ctaHref} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{display:"block",marginTop:28,borderRadius:16,padding:"16px",textAlign:"center" as const,fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:900,background:featured?`linear-gradient(90deg,${accent},#0047cc)`:"rgba(255,255,255,0.07)",border:featured?"none":"1px solid rgba(255,255,255,0.12)",color:"#fff",boxShadow:featured?`0 16px 40px ${accent}55`:"none",transform:hovered?"translateY(-2px)":"none",transition:"transform 0.2s ease",textDecoration:"none"}}>{cta}</a>
      </div>
    </div>
  );
}
