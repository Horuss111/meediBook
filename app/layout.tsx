import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
