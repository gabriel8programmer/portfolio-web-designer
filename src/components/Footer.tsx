import React from "react";
import Link from "next/link";
import { WhatsAppIcon, InstagramIcon } from "./Icons";
import { Logo } from "./Logo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const whatsappUrl = getWhatsAppUrl();
  const instagramUrl =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://instagram.com/gbsoftwaresolutions";

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block" aria-label="GB Software Solutions - Início">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-md">
              Criação de websites profissionais, landing pages e catálogos digitais sob medida para pequenas e médias empresas, profissionais liberais e negócios locais.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp da GB Software Solutions"
              >
                <span className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </span>
                <span>WhatsApp</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                aria-label="Instagram da GB Software Solutions"
              >
                <span className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500/50 shadow-sm">
                  <InstagramIcon className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                </span>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/projetos"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Projetos & Portfólio
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Contato & Propostas
                </Link>
              </li>
            </ul>
          </div>

          {/* Commercial Reassurance */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Atendimento Comercial
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              Pronto para colocar sua empresa em destaque na internet e converter mais visitantes em clientes?
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 underline underline-offset-4"
            >
              Falar diretamente pelo WhatsApp &rarr;
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; 2026 GB Software Solutions. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="/admin"
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-400 transition-colors"
            >
              Acesso Restrito
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
