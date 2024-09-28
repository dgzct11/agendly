import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Agendly",
  description: "Use AI to organize your calendar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
