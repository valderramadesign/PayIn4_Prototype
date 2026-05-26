import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pay in 4 Prototype",
  description: "PayPal Pay in 4 interactive prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
