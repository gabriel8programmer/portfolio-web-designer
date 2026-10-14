import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GB Software Solutions | Criação de Sites Profissionais para Empresas",
  description:
    "Desenvolvimento de websites profissionais, páginas de venda e presença digital para empresas e profissionais liberais. Solicite um orçamento rápido pelo WhatsApp.",
  keywords: [
    "criação de sites",
    "web designer",
    "site institucional",
    "landing page para empresas",
    "GB Software Solutions",
    "web design comercial",
  ],
  authors: [{ name: "GB Software Solutions" }],
  openGraph: {
    title: "GB Software Solutions | Criação de Sites Profissionais",
    description:
      "Websites modernos, rápidos e pensados para transformar visitantes em novos clientes para o seu negócio.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
