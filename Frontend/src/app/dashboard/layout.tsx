import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "🏥 Clínica NC - Dashboard", template: "%s | 🏥 Clínica NC" },
  openGraph: {
    siteName: "🏥 Clínica NC Dashboard",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
