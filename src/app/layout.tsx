import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdullah's Tech Warranty Guide | Claim Ready",
  description:
    "Curated by Abdullah Mujaddid Adli Bin Abdul Halim (BSW01084329) — A free checklist for anyone in Malaysia about to file a device or EV warranty claim.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-white text-[#0D1117] font-sans antialiased selection:bg-[#DBEAFE] selection:text-[#1D4ED8]">
        {children}
      </body>
    </html>
  );
}
