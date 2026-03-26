import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { patientName, phone, telegramUsername, doctor, date, time } = body;

    // 🧾 Message for customer
    const customerMessage = `Hello ${patientName},
Your appointment is confirmed ✅

Doctor: ${doctor}
Date: ${date}
Time: ${time}

MediBook 🏥`;

    // 🧾 Message for admin
    const adminMessage = `
New Appointment 🚀

Patient: ${patientName}
Phone: ${phone}
Doctor: ${doctor}
Date: ${date}
Time: ${time}
`;

    console.log("📩 CUSTOMER MESSAGE:");
    console.log(customerMessage);

    console.log("📩 ADMIN MESSAGE:");
    console.log(adminMessage);

    // =========================
    // 📧 SEND EMAIL TO ADMIN (REAL)
    // =========================
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MediBook <onboarding@resend.dev>",
        to: "khooliganz286@gmail.com",
        subject: "🚀 New Appointment Booked",
        html: `
          <h2>New Booking</h2>
          <p><b>Patient:</b> ${patientName}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Doctor:</b> ${doctor}</p>
          <p><b>Date:</b> ${date}</p>
          <p><b>Time:</b> ${time}</p>
        `,
      }),
    });
    const adminData = await adminRes.json();
    if (!adminRes.ok) {
      console.error("❌ Admin email failed:", adminData);
    } else {
      console.log("✅ Admin email sent");
    }

    // =========================
    // 📧 SEND EMAIL TO CUSTOMER (REAL)
    // =========================
    const customerRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MediBook <onboarding@resend.dev>",
        to: "khooilganz286@gmail.com",
        subject: "✅ Your Appointment is Confirmed",
        html: `
          <h2>Hello ${patientName}</h2>
          <p>Your appointment is confirmed ✅</p>
          <p><b>Doctor:</b> ${doctor}</p>
          <p><b>Date:</b> ${date}</p>
          <p><b>Time:</b> ${time}</p>
          <br/>
          <p>Thank you for using MediBook 🏥</p>
        `,
      }),
    });
    const customerData = await customerRes.json();
    if (!customerRes.ok) {
      console.error("❌ Customer email failed:", customerData);
    } else {
      console.log("✅ Customer email sent");
    }

    // =========================
    // 📲 TELEGRAM TO MATCHED USER (TARGETED)
    // =========================
    try {
      const normalizedUsername = (telegramUsername || "")
        .replace("@", "")
        .toLowerCase();

      console.log("🔍 Searching for:", normalizedUsername);

      if (!normalizedUsername) {
        console.error("❌ No telegramUsername provided");
      } else {
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/telegram_users?username=eq.${normalizedUsername}&limit=1`,
          {
            headers: {
              apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
              Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            },
          }
        );

        const users = await userRes.json();
        const user = Array.isArray(users) ? users[0] : null;

        console.log("👤 Found:", user);

        // 🚨 HARD STOP
        if (!user || !user.chat_id) {
          console.error("❌ USER NOT FOUND → STOP");
        } else {
          const res = await fetch(
            `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                chat_id: user.chat_id,
                text: `✅ APPOINTMENT CONFIRMED

👤 ${patientName}
🩺 ${doctor}
📅 ${date}
⏰ ${time}

MediBook 🏥`,
              }),
            }
          );

          const data = await res.json();

          if (!res.ok) {
            console.error("❌ TELEGRAM SEND ERROR:", data);
          } else {
            console.log("✅ Telegram sent to matched user:", normalizedUsername);
          }
        }
      }
    } catch (err) {
      console.error("❌ TELEGRAM TARGET ERROR:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Notifications sent",
    });

  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}