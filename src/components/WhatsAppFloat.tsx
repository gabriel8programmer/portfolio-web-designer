"use client";

import React from "react";
import { WhatsAppIcon } from "./Icons";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <aside aria-label="Contato direto via WhatsApp">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp com GB Software Solutions"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-full shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
        </span>
        <WhatsAppIcon className="w-5 h-5 text-slate-950" />
        <span className="hidden sm:inline">Orçamento no WhatsApp</span>
      </a>
    </aside>
  );
}
