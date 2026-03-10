export const metadata = {
  title: "MediBook",
  description: "Premium healthcare platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin:0}}>{children}</body>
    </html>
  );
}
