import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emily Experience - Premium Event Planning",
  description: "Plan your dream event with Emily Experience. Access free guides, checklists, and expert vendor recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-emily-dark">
        {children}
      </body>
    </html>
  );
}
