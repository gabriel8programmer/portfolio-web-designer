import React from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import {
  WhatsAppIcon,
  InstagramIcon,
  MailIcon,
  CheckIcon,
} from "@/components/Icons";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato & Orçamento | GB Software Solutions",
  description:
    "Entre em contato conosco pelo WhatsApp ou formulário para solicitar um orçamento para o website ou landing page da sua empresa.",
};

export default function ContatoPage() {
  const whatsappUrl = getWhatsAppUrl(
    "Olá! Gostaria de falar sobre a criação de um site para o meu negócio."
  );
  const instagramUrl =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://instagram.com/gbsoftwaresolutions";
  const contactEmail =
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    process.env.SUPER_ADMIN_EMAIL ||
    "contato@gbsoftwaresolutions.com.br";

  return (
    <div className="py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 block">
            Canais de Atendimento
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Vamos criar o site ideal para a sua empresa?
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Seja para tirar dúvidas, receber uma estimativa de investimento ou apresentar suas ideias, estamos prontos para atender você.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct WhatsApp & Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Conversion Card (WhatsApp) */}
            <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900/80 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Opção mais rápida
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Atendimento no WhatsApp
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Fale diretamente conosco pelo WhatsApp. É o canal mais prático para tirar dúvidas rápidas e receber uma proposta personalizada.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-5 h-5 text-slate-950" />
                <span>Conversar no WhatsApp Agora</span>
              </a>

              <div className="mt-5 pt-5 border-t border-emerald-900/50 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sem formulários demorados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Resposta ágil em horário comercial</span>
                </div>
              </div>
            </div>

            {/* Other Channels */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Outros canais
              </h3>

              <div className="space-y-3">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors text-sm"
                >
                  <span className="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                    <InstagramIcon className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="block font-medium">Instagram</span>
                    <span className="text-xs text-slate-400">@gbsoftwaresolutions</span>
                  </div>
                </a>

                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors text-sm"
                >
                  <span className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    <MailIcon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block font-medium">E-mail Comercial</span>
                    <span className="text-xs text-slate-400 truncate block">
                      {contactEmail}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
