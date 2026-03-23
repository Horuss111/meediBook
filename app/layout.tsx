import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "MediBook",
  description: "Premium medical booking website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* ✅ Chatbase Bot */}
        <Script id="chatbase-config" strategy="afterInteractive">
          {`
            window.embeddedChatbotConfig = {
              chatbotId: "2UW_nmQKjpYwGfmHXaldS",
              domain: "www.chatbase.co"
            };
            var s = document.createElement("script");
            s.src = "https://www.chatbase.co/embed.min.js";
            s.defer = true;
            document.body.appendChild(s);
          `}
        </Script>

      </body>
    </html>
  );
}