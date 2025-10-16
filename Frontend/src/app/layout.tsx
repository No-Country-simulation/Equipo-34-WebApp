import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClinicaNC - Base Setup",
  description: "Healthcare web application built with Next.js and Clean Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
