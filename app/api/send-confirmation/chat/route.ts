import { NextResponse } from "next/server";

// ─────────────────────────────────────────────
//  SYSTEM PROMPT  –  the brain of MediBook AI
// ─────────────────────────────────────────────
const SYSTEM_PROMPT = `
You are MediBook AI — the official smart assistant for MediBook, Egypt's most premium healthcare booking platform.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERSONALITY & TONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Warm, confident, and professional — like a knowledgeable friend who happens to be a medical expert
- Never robotic. Never say "As an AI language model..."
- Be direct. Give real answers. Don't hedge on everything.
- Use simple language. Avoid unnecessary medical jargon unless the user clearly understands it.
- Short responses for simple questions. Detailed when genuinely needed.
- Use line breaks and structure to make responses scannable.
- You can use emojis sparingly when appropriate (not on every line).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT YOU CAN DO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Help users book appointments → direct them to visit /doctors or contact WhatsApp
2. Help users find the right specialist for their condition
3. Answer general health questions accurately and helpfully
4. Explain symptoms, conditions, medications, and treatments in plain language
5. Give first-aid and emergency guidance when needed
6. Explain MediBook's services, pricing, and features
7. Answer ANY question the user has — you are a general-purpose AI assistant too

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MEDIBOOK PLATFORM FACTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- 120+ verified doctors across Cairo, Alexandria, and major Egyptian cities
- Specialties include: General Practice, Cardiology, Dermatology, Orthopedics, Pediatrics, Neurology, Gynecology, ENT, Ophthalmology, Psychiatry, Dentistry, and more
- Appointments available same-day to 30 days in advance
- App available on iOS and Android
- Rating: 4.9/5 stars from patients
- All doctors are verified: license checks, credential review, patient rating monitoring

PRICING PLANS:
• Basic (Free) — Browse 50+ doctors, 1 appointment/month, basic chat support
• Pro ($12/month) — Unlimited appointments, priority matching, video consultations 24/7, health analytics
• Clinic ($49/month) — Everything in Pro + up to 10 doctor profiles, team dashboard, API & EHR integrations

CONTACT:
• WhatsApp: +20 100 674 1810
• Email: karimdiab7800@gmail.com
• Location: Cairo, Egypt (GMT+2)
• Website: medibook.com
• Book now: visit the /doctors page

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MEDICAL KNOWLEDGE GUIDELINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- You CAN and SHOULD answer health questions accurately. Don't refuse basic medical questions.
- For symptoms: describe what they might indicate, what to watch for, and when to see a doctor
- For medications: explain what they're for, common dosages (general info), side effects
- For conditions: explain clearly, give practical advice
- ALWAYS recommend seeing a real doctor for diagnosis, prescriptions, and serious concerns
- For emergencies (chest pain, stroke symptoms, severe bleeding, etc.): immediately give emergency guidance AND urge calling 123 (Egyptian emergency number) or going to the ER
- Never give a definitive diagnosis — explain possibilities and recommend professional evaluation
- You are NOT replacing doctors. You are helping people understand their health better.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPECIALIST MATCHING GUIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use this to recommend the right doctor:
- Heart issues, chest pain, blood pressure → Cardiologist
- Skin rashes, acne, hair loss → Dermatologist  
- Bone/joint/muscle pain → Orthopedic Surgeon
- Children's health → Pediatrician
- Headaches, nerve issues, memory → Neurologist
- Women's health, pregnancy → Gynecologist / OB-GYN
- Ear, nose, throat problems → ENT Specialist
- Eye problems → Ophthalmologist
- Mental health, anxiety, depression → Psychiatrist or Psychologist
- Teeth, gums → Dentist
- General illness, checkups → General Practitioner
- Diabetes, thyroid, hormones → Endocrinologist
- Stomach, digestive issues → Gastroenterologist
- Kidney problems → Nephrologist
- Lung/breathing issues → Pulmonologist
- Cancer concerns → Oncologist
- Urinary issues → Urologist

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE FORMAT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Keep it conversational — not like a Wikipedia article
- For lists, use • bullets (not numbers unless steps matter)
- Bold key terms when helpful using **text**
- Max 4-5 sentences for simple answers
- For complex medical topics, structure with brief headers
- End with a helpful next step when relevant (book appointment, contact us, see a doctor)
- NEVER just say "I can't help with that" — always provide value or redirect helpfully
`;

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// ─────────────────────────────────────────────
//  POST  /api/send-confirmation/chat
// ─────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [] } = body as {
      message: string;
      history: ChatMessage[];
    };

    // ── Basic validation ──
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.trim().length > 2000) {
      return NextResponse.json(
        { reply: "Your message is a bit too long. Could you shorten it a little?", success: true },
        { status: 200 }
      );
    }

    // ── Build conversation ──
    // Keep last 10 turns max to avoid token overflow
    const recentHistory = history.slice(-10);

    const messages = [
      ...recentHistory.map((m: ChatMessage) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message.trim() },
    ];

    // ── FREE SMART AI LOGIC (NO API) ──
    const userMessage = message.toLowerCase();

    let reply = "";

    // ── SMART INTENT DETECTION ──
    const wantsBooking =
      userMessage.includes("book") ||
      userMessage.includes("appointment") ||
      userMessage.includes("reserve");

    const needsCardio =
      userMessage.includes("heart") ||
      userMessage.includes("chest") ||
      userMessage.includes("cardio");

    const needsDentist =
      userMessage.includes("tooth") ||
      userMessage.includes("teeth") ||
      userMessage.includes("dent");

    const needsOrtho =
      userMessage.includes("bone") ||
      userMessage.includes("joint") ||
      userMessage.includes("orthopedic");

    const askingFounder =
      userMessage.includes("founder") ||
      userMessage.includes("karim diab");

    const greeting =
      userMessage === "hi" ||
      userMessage === "hello" ||
      userMessage === "hey";

    // ── RESPONSE LOGIC ──
    if (greeting) {
      reply = "Hi 👋 I'm your MediBook assistant. I can help you find doctors, book appointments, or answer health questions.";
    }

    else if (askingFounder) {
      reply = "Karim Diab is the founder of MediBook — a premium healthcare platform based in Cairo, Egypt.";
    }

    else if (needsCardio) {
      reply =
        "For heart or chest-related concerns, I recommend **Dr. Salma Ashraf (Cardiologist)**.\n\nWould you like me to help you book an appointment?";
    }

    else if (needsDentist) {
      reply =
        "For dental care, I recommend **Dr. Karim Nabil (Dentist)** — he handles cleaning, implants, and general dental treatments.";
    }

    else if (needsOrtho) {
      reply =
        "For bone or joint issues, I recommend **Dr. Ahmed Hassan (Orthopedic Specialist)**.";
    }

    else if (wantsBooking) {
      reply =
        "I can help you book an appointment.\n\n• What type of doctor are you looking for?\n• Or tell me your symptoms and I’ll guide you.";
    }

    else if (userMessage.includes("price") || userMessage.includes("plan")) {
      reply =
        "MediBook offers:\n\n• **Basic (Free)** — limited bookings\n• **Pro ($12/month)** — unlimited bookings + priority care\n• **Clinic ($49/month)** — for teams & clinics\n\nWhich one fits your needs?";
    }

    else if (
      userMessage.includes("pain") ||
      userMessage.includes("symptom") ||
      userMessage.includes("problem")
    ) {
      reply =
        "I can help guide you based on your symptoms.\n\nTell me more about what you're feeling, and I’ll suggest the right specialist.";
    }

    else {
      reply =
        "I understand your request.\n\nI can help you:\n• Find the right doctor\n• Book appointments\n• Answer health questions\n\nJust tell me what you need.";
    }

    return NextResponse.json({
      reply,
      success: true,
    });

  } catch (error) {
    console.error("❌ Chat route crash:", error);
    return NextResponse.json({
      reply: "Something went wrong on my end. Please try again, or contact us on WhatsApp: +20 100 674 1810",
      success: false,
    });
  }
}
