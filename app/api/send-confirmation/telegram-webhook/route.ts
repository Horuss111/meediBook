import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // important
);

export async function POST(req: Request) {
  const body = await req.json();

  const chatId = body.message?.chat?.id;
  let username = body.message?.from?.username;

  // normalize username (remove @ and lowercase)
  if (username) {
    username = username.replace("@", "").toLowerCase();
  }

  if (!chatId) return NextResponse.json({ ok: false });

  // 🔥 Save user
  const { data, error } = await supabase
    .from("telegram_users")
    .upsert(
      {
        chat_id: chatId,
        username: username || null,
      },
      {
        onConflict: "chat_id",
      }
    );

  if (error) {
    console.error("❌ TELEGRAM SAVE ERROR:", error);
  } else {
    console.log("✅ Telegram user saved:", { chatId, username });
  }

  console.log("📩 Incoming Telegram webhook:", {
    chatId,
    username,
  });

  return NextResponse.json({ ok: true });
}