import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // important
);

export async function POST(req: Request) {
  const body = await req.json();

  const chatId = body.message?.chat?.id;
  const username = body.message?.from?.username;

  if (!chatId) return NextResponse.json({ ok: false });

  // 🔥 Save user
  await supabase.from("telegram_users").upsert({
    chat_id: chatId,
    username: username || null,
  });

  return NextResponse.json({ ok: true });
}