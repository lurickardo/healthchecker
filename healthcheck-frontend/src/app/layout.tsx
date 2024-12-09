import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Healthchecker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${fontSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
