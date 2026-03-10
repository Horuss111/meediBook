export default function Page() {
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

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07111f] text-white">
      {/* HERO */}
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.35),_transparent_25%),radial-gradient(circle_at_20%_80%,_rgba(244,114,182,0.18),_transparent_20%),linear-gradient(135deg,_#07111f_0%,_#0b1730_40%,_#0c1f46_70%,_#08111e_100%)]" />

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-sky-200 backdrop-blur-xl">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Luxury healthcare platform
        </div>

        <h1 className="text-5xl font-black tracking-tight md:text-7xl">
          MediBook
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
          Premium healthcare experience with elegant design, powerful booking,
          and a next‑level digital journey for patients and clinics.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-2xl bg-white px-8 py-4 text-sm font-extrabold text-slate-950 shadow-[0_20px_50px_rgba(255,255,255,0.15)] transition hover:-translate-y-1">
            Download App
          </button>
          <button className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-extrabold text-white transition hover:-translate-y-1 hover:bg-white/10">
            Explore Features
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 text-center">
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">Features</div>
          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Designed to feel premium at every touchpoint
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:-translate-y-2"
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black text-white ${
                  i === 0
                    ? "bg-gradient-to-br from-pink-500 to-rose-500"
                    : i === 1
                    ? "bg-gradient-to-br from-blue-700 to-sky-400"
                    : "bg-gradient-to-br from-amber-400 to-orange-400"
                }`}
              >
                {i + 1}
              </div>
              <h3 className="text-xl font-black tracking-tight">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/20 py-10 text-center">
        <div className="text-lg font-black">MediBook</div>
        <div className="mt-2 text-sm text-white/60">Luxury digital healthcare platform</div>
        <div className="mt-4 text-sm text-white/60">
          © {new Date().getFullYear()} MediBook. All rights reserved.
        </div>
      </footer>
    </main>
  );
}