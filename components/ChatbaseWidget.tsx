"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getSupabaseClient, hasSupabaseEnv } from "@/lib/supabase";

export default function ChatbaseWidget() {
  const { user, profile } = useAuth();

  useEffect(() => {
    async function initChatbase() {
      let userContext = "";

      if (user && profile && hasSupabaseEnv()) {
        const supabase = getSupabaseClient();
        // Fetch appointments for this user
        const { data: appointments } = await supabase
          .from("appointments")
          .select("*")
          .eq("user_id", user.id)
          .order("appointment_date", { ascending: true })
          .limit(5);

        const appointmentText = appointments && appointments.length > 0
          ? appointments.map((a) =>
              `- ${a.doctor_name} (${a.specialty}) on ${new Date(a.appointment_date).toLocaleDateString("en-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at ${a.appointment_time} — Status: ${a.status}`
            ).join("\n")
          : "No upcoming appointments.";

        userContext = `
The patient currently logged in is:
- Name: ${profile.full_name || "Unknown"}
- Email: ${profile.email}
- Member since: ${new Date(profile.created_at).toLocaleDateString()}

Their appointments:
${appointmentText}

Always greet them by their first name. If they ask about their appointment, use the information above to answer accurately.
        `.trim();
      } else {
        userContext = "The user is not logged in. Greet them warmly and encourage them to log in to view their appointments and personal information.";
      }

      // Set Chatbase config with user context
      (window as any).embeddedChatbotConfig = {
        chatbotId: "2UW_nmQKjpYwGfmHXaldS",
        domain: "www.chatbase.co",
        customData: {
          user_context: userContext,
        },
      };

      // Load or reload Chatbase script
      const existingScript = document.getElementById("chatbase-widget");
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.id = "chatbase-widget";
      script.src = "https://www.chatbase.co/embed.min.js";
      script.defer = true;
      document.body.appendChild(script);
    }

    initChatbase();
  }, [user, profile]);

  return null;
}
