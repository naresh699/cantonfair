import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Canton Fair India 2026 | Official Business Tour & Visa Guidance",
  description: "Join the largest India-China business delegation. We provide complete guidance for Canton Fair 2026, including business visas, sourcing trips, and factory visits for Indian entrepreneurs.",
  keywords: "Canton Fair 2026, China Business Tour from India, Canton Fair India, China Visa for Indians, Sourcing from China, India China Trade, Business Delegation China",
  openGraph: {
    title: "Canton Fair India 2026 | Official Business Tour",
    description: "Join the largest India-China business delegation. Complete guidance for Canton Fair 2026.",
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Canton Fair India 2026",
    description: "Your gateway to the world's largest trade fair.",
    images: ['/logo.png'],
  },
};

import DynamicFooter from "@/components/DynamicFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
        <DynamicFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
