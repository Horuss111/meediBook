"use client";
import { useEffect, useState } from "react";

export default function MediBookWebsiteLandingPage() {
  const [showSplash, setShowSplash] = useState(true);

  const features = [
    {
      title: "Fast premium booking",
      text: "Search doctors, compare specialists, and reserve appointments through a luxury healthcare experience.",
    },
    {
      title: "Real-time chat care",
      text: "Stay connected with clinics and doctors through a polished messaging flow built for trust and speed.",
    },
    {
      title: "Beautiful patient journey",
      text: "From splash screen to booking confirmation, every touchpoint feels modern, high-end, and easy to use.",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Salma Ashraf",
      role: "Patient",
      quote:
        "The design feels premium and calm. Booking an appointment was faster than any medical app I used before.",
    },
    {
      name: "Dr. Mohamed H.",
      role: "Clinic Partner",
      quote:
        "MediBook gives our clinic a luxury digital presence while keeping the experience simple for patients.",
    },
    {
      name: "Karim Diab",
      role: "Founder",
      quote:
        "MediBook was founded to make healthcare feel modern, elegant, and smooth on both mobile and web.",
    },
  ];

  useEffect(() => {
    const t = window.setTimeout(() => setShowSplash(false), 2200);

    const reveal = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add("active");
        }
      });
    };

    reveal();
    window.addEventListener("scroll", reveal);

    return () => {
      window.removeEventListener("scroll", reveal);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <>
      <style>{`
        .reveal { opacity: 0; transform: translateY(40px); transition: all .9s cubic-bezier(.2,.65,.2,1); }
        .reveal.active { opacity: 1; transform: none; }
        @keyframes floatY { 0% { transform: translateY(0); } 50% { transform: translateY(-14px); } 100% { transform: translateY(0); } }
        @keyframes tilt { 0% { transform: rotateX(0) rotateY(0); } 50% { transform: rotateX(6deg) rotateY(-6deg); } 100% { transform: rotateX(0) rotateY(0); } }
        .motion-float { animation: floatY 6s ease-in-out infinite; }
        .motion-tilt { animation: tilt 10s ease-in-out infinite; transform-style: preserve-3d; }
        @keyframes splashFloat { 0% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.04); } 100% { transform: translateY(0) scale(1); } }
        @keyframes splashPulse { 0%,100% { opacity: .4; transform: scale(.8); } 50% { opacity: 1; transform: scale(1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .animate-splashFloat { animation: splashFloat 2.2s ease-in-out infinite; }
        .animate-splashPulse { animation: splashPulse 1.6s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn .8s ease forwards; }
      `}</style>

      {showSplash && <SplashOverlay />}

      <div className="min-h-screen overflow-x-hidden bg-[#07111f] text-white">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.30),_transparent_22%),radial-gradient(circle_at_15%_75%,_rgba(244,114,182,0.16),_transparent_18%),radial-gradient(circle_at_80%_30%,_rgba(250,204,21,0.12),_transparent_18%),linear-gradient(135deg,_#07111f_0%,_#0b1730_35%,_#0c1f46_65%,_#08111e_100%)]" />

        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/55 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <a href="#home" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-blue-700 to-sky-400 shadow-[0_20px_45px_rgba(59,130,246,0.35)]">
                <LogoGrid />
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-white">MediBook</div>
                <div className="text-xs font-medium text-blue-100/70">Premium care, beautifully connected</div>
              </div>
            </a>

            <nav className="hidden items-center gap-8 text-sm font-semibold text-white/70 md:flex">
              <a href="#about" className="transition hover:text-white">About</a>
              <a href="#features" className="transition hover:text-white">Features</a>
              <a href="#testimonials" className="transition hover:text-white">Testimonials</a>
              <a href="#download" className="transition hover:text-white">Download</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
            </nav>

            <div className="flex items-center gap-3">
              <button className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10">
                Sign In
              </button>
              <button className="rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-[0_18px_40px_rgba(255,255,255,0.18)] transition hover:-translate-y-0.5">
                Get Started
              </button>
            </div>
          </div>
        </header>

        <main>
          <section id="home" className="reveal mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-sky-200 backdrop-blur-xl">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Luxury healthcare platform experience
              </div>

              <h1 className="max-w-2xl text-5xl font-black leading-none tracking-tight text-white md:text-7xl">
                A darker, smarter, premium website for your medical app.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                MediBook combines elegant product design, powerful appointment flow, and high-end medical branding into one seamless digital experience.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#download"
                  className="rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-slate-950 shadow-[0_22px_50px_rgba(255,255,255,0.14)] transition hover:-translate-y-0.5"
                >
                  Download App
                </a>
                <a
                  href="#features"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Explore Features
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-3xl">
              <div className="absolute -left-10 top-20 h-52 w-52 rounded-full bg-pink-400/12 blur-3xl" />
              <div className="absolute -right-6 top-0 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
              <div className="absolute bottom-0 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl" />

              <div className="relative flex items-end justify-center gap-4 md:gap-6 [perspective:1400px]">
                <PhoneCard tone="from-rose-700 via-pink-700 to-fuchsia-600" title="Sleep Care" subtitle="Premium digital flow" />
                <PhoneCard tone="from-slate-950 via-blue-700 to-sky-400" title="Find Best Doctor" subtitle="3D luxury experience" featured />
                <PhoneCard tone="from-amber-400 via-yellow-400 to-orange-300" title="Dental Care" subtitle="Fast booking journey" />
              </div>
            </div>
          </section>

          <section id="features" className="reveal mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-16">
            <div className="mb-8">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">Features</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
                One-page scrolling design with premium sections that sell the product.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="rounded-[30px] border border-white/10 bg-white/5 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black text-white ${
                      i === 0
                        ? "bg-gradient-to-br from-pink-500 to-rose-500"
                        : i === 1
                          ? "bg-gradient-to-br from-blue-700 to-sky-400"
                          : "bg-gradient-to-br from-amber-400 to-orange-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{feature.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="testimonials" className="reveal mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-16">
            <div className="mb-8">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">Testimonials</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
                Loved by patients, trusted by clinics.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="rounded-[30px] border border-white/10 bg-white/5 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
                >
                  <div className="text-base font-semibold leading-8 text-white/78">“{item.quote}”</div>
                  <div className="mt-6 h-px w-full bg-white/10" />
                  <div className="mt-5 text-lg font-black tracking-tight text-white">{item.name}</div>
                  <div className="text-sm font-semibold text-sky-200/70">{item.role}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function SplashOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07111f]">
      <div className="relative flex flex-col items-center gap-6">
        <div className="flex h-28 w-28 animate-splashFloat items-center justify-center rounded-[28px] bg-gradient-to-br from-slate-900 via-blue-700 to-sky-400 shadow-[0_30px_80px_rgba(59,130,246,0.45)]">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full bg-white animate-splashPulse"
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
        </div>
        <div className="animate-fadeIn text-3xl font-black tracking-tight text-white">MediBook</div>
      </div>
    </div>
  );
}

function LogoGrid() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
      ))}
    </div>
  );
}

function PhoneCard({
  tone,
  title,
  subtitle,
  featured = false,
}: {
  tone: string;
  title: string;
  subtitle: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`motion-float motion-tilt relative rounded-[42px] bg-gradient-to-br ${tone} p-[1px] shadow-[0_35px_80px_rgba(0,0,0,0.34)] ${
        featured
          ? "h-[580px] w-[280px] md:w-[320px]"
          : "h-[510px] w-[220px] translate-y-10 md:w-[240px]"
      }`}
    >
      <div className="absolute inset-0 rounded-[42px] border border-white/15" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[41px] bg-black/10 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 pt-5 text-white">
          <div className="text-lg font-black tracking-tight">MediBook</div>
          <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">Live</div>
        </div>

        <div className="px-5 pt-6 text-white">
          <div className="max-w-[180px] text-4xl font-black leading-none tracking-tight">{title}</div>
          <div className="mt-3 text-sm font-medium text-white/80">{subtitle}</div>
        </div>

        <div className="relative mt-6 flex-1 px-6">
          <div className="absolute left-1/2 top-8 h-44 w-36 -translate-x-1/2 rounded-[30px] bg-white/85 shadow-[0_24px_50px_rgba(0,0,0,0.22)]" />
          <div className="absolute left-1/2 top-3 h-12 w-28 -translate-x-1/2 rounded-2xl bg-white/95" />
          <div className="absolute bottom-6 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full bg-black/25 blur-md" />
        </div>

        <div className="m-3 rounded-[28px] bg-white p-5 text-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.14)]">
          <div className="text-2xl font-black leading-tight tracking-tight">Premium Medical Booking</div>
          <div className="mt-2 text-sm font-medium text-slate-500">
            Beautiful doctor discovery, booking, and patient care flow.
          </div>
          <button className="mt-4 w-full rounded-2xl bg-yellow-400 px-4 py-3 text-sm font-extrabold text-slate-950">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
<div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-sky-300">Quick Links</div>
              <div className="mt-4 flex flex-col gap-2 text-sm font-semibold text-white/68">
                <a href="#about" className="hover:text-white">About</a>
                <a href="#features" className="hover:text-white">Features</a>
                <a href="#testimonials" className="hover:text-white">Testimonials</a>
                <a href="#download" className="hover:text-white">Download</a>
              </div>
            </div>

            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-sky-300">Contact</div>
              <div className="mt-4 text-sm font-semibold text-white/68">karimdiab7800@gmail.com</div>
              <div className="mt-2 text-sm font-semibold text-white/68">+20 100 674 1810 (WhatsApp)</div>
              <div className="mt-2 text-sm font-semibold text-white/68">Cairo, Egypt</div>
            </div>
          </div>

          <a
            href="https://wa.me/201006741810"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-white shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition hover:scale-105"
          >
            WhatsApp Us
          </a>
        </footer>
      </div>
    </>
  );
}

function SplashOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07111f]">
      <div className="relative flex flex-col items-center gap-6">
        <div className="flex h-28 w-28 animate-splashFloat items-center justify-center rounded-[28px] bg-gradient-to-br from-slate-900 via-blue-700 to-sky-400 shadow-[0_30px_80px_rgba(59,130,246,0.45)]">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full bg-white animate-splashPulse"
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
        </div>
        <div className="animate-fadeIn text-3xl font-black tracking-tight text-white">MediBook</div>
      </div>
    </div>
  );
}

function LogoGrid() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
      ))}
    </div>
  );
}

function PhoneCard({
  tone,
  title,
  subtitle,
  featured = false,
}: {
  tone: string;
  title: string;
  subtitle: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`motion-float motion-tilt relative rounded-[42px] bg-gradient-to-br ${tone} p-[1px] shadow-[0_35px_80px_rgba(0,0,0,0.34)] ${
        featured
          ? "h-[580px] w-[280px] md:w-[320px]"
          : "h-[510px] w-[220px] translate-y-10 md:w-[240px]"
      }`}
    >
      <div className="absolute inset-0 rounded-[42px] border border-white/15" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[41px] bg-black/10 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 pt-5 text-white">
          <div className="text-lg font-black tracking-tight">MediBook</div>
          <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">Live</div>
        </div>

        <div className="px-5 pt-6 text-white">
          <div className="max-w-[180px] text-4xl font-black leading-none tracking-tight">{title}</div>
          <div className="mt-3 text-sm font-medium text-white/80">{subtitle}</div>
        </div>

        <div className="relative mt-6 flex-1 px-6">
          <div className="absolute left-1/2 top-8 h-44 w-36 -translate-x-1/2 rounded-[30px] bg-white/85 shadow-[0_24px_50px_rgba(0,0,0,0.22)]" />
          <div className="absolute left-1/2 top-3 h-12 w-28 -translate-x-1/2 rounded-2xl bg-white/95" />
          <div className="absolute bottom-6 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full bg-black/25 blur-md" />
        </div>

        <div className="m-3 rounded-[28px] bg-white p-5 text-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.14)]">
          <div className="text-2xl font-black leading-tight tracking-tight">Premium Medical Booking</div>
          <div className="mt-2 text-sm font-medium text-slate-500">
            Beautiful doctor discovery, booking, and patient care flow.
          </div>
          <button className="mt-4 w-full rounded-2xl bg-yellow-400 px-4 py-3 text-sm font-extrabold text-slate-950">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

/*
Manual test checklist:
1. Splash overlay appears first, then disappears after about 2.2 seconds.
2. Page renders without syntax errors.
3. Scrolling adds the "active" class to .reveal sections.
4. WhatsApp floating button opens a new tab safely.
5. Navigation anchors jump to the correct sections.
*/
