import React from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ProjectCard } from "@/components/ProjectCard";
import {
  WhatsAppIcon,
  InstagramIcon,
  ArrowRightIcon,
  CheckIcon,
  ShieldCheckIcon,
  GlobeIcon,
  PhoneIcon,
} from "@/components/Icons";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const instant = false;

export default async function HomePage() {
  let featuredProjects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
    take: 3,
  });

  if (featuredProjects.length === 0) {
    featuredProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
      take: 3,
    });
  }

  const whatsappUrl = getWhatsAppUrl();
  const instagramUrl =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://instagram.com/gbsoftwaresolutions";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-slate-200 dark:border-slate-900 bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Subtle glow highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Intro & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              {/* Tag / Positioning */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-emerald-700 dark:text-emerald-400 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Web Designer Especialista para Empresas</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
                Websites profissionais que{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                  geram credibilidade
                </span>{" "}
                e atraem novos clientes.
              </h1>

              {/* Short Introduction */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Criamos sites modernos, rápidos no smartphone e pensados para transformar visitantes vindos do Instagram e do Google Maps em contatos reais no seu WhatsApp.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-base font-bold shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-5 h-5 text-slate-950 shrink-0" />
                  <span className="whitespace-nowrap">Solicitar Orçamento no WhatsApp</span>
                </a>

                <Link
                  href="/projetos"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-slate-300 dark:border-slate-800 bg-white hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white text-base font-medium transition-colors shadow-sm whitespace-nowrap"
                >
                  <span className="whitespace-nowrap">Ver Projetos</span>
                  <ArrowRightIcon className="w-4 h-4 shrink-0" />
                </Link>
              </div>

              {/* Channels & Social Links */}
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-slate-500 dark:text-slate-400">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors font-medium"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-500" />
                  <span>@gbsoftwaresolutions</span>
                </a>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span>Atendimento rápido para todo o Brasil</span>
              </div>
            </div>

            {/* Right Column: Prominent Professional Profile Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Ambient glow behind profile picture */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 rounded-3xl blur-2xl -z-10" />

                {/* Profile Picture Card */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-2.5">
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <Image
                      src="/perfil.png"
                      alt="Foto de Perfil - GB Software Solutions Web Designer"
                      fill
                      priority
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 400px"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />

                    {/* Bottom Card Overlay Tag */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm text-white">
                            GB Software Solutions
                          </p>
                          <p className="text-xs text-emerald-400 font-medium">
                            Web Designer para Negócios
                          </p>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Online
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge: Mobile Ready */}
                <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xl">
                  <GlobeIcon className="w-4 h-4 text-emerald-500" />
                  <span>Sites 100% Responsivos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Highlights / Value Props */}
      <section className="py-16 md:py-20 border-b border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white mb-3">
              Por que investir em um site profissional para o seu negócio?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Apresente sua empresa com a seriedade que seus clientes procuram antes de fechar um serviço ou compra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-600 dark:text-emerald-400">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
                Credibilidade Imediata
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Quando alguém pesquisa seu serviço, encontrar um site estruturado transmite segurança e confirma que sua empresa é confiável e profissional.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-600 dark:text-emerald-400">
                <PhoneIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
                Contato Rápido no WhatsApp
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Botões de contato estrategicamente posicionados para que o cliente não perca tempo e inicie a conversa diretamente com você.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-600 dark:text-emerald-400">
                <GlobeIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
                Perfeito em Qualquer Celular
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Mais de 80% do público acessa pelo smartphone. Seus clientes terão uma navegação fluida, sem letras minúsculas ou botões difíceis de clicar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950/70 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 block">
                Portfólio Selecionado
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
                Projetos & Modelos de Sites
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
                Confira como apresentamos a proposta visual e comercial de diferentes segmentos de negócios.
              </p>
            </div>

            <Link
              href="/projetos"
              className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-sm transition-colors"
            >
              <span>Ver todos os projetos</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projetos"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 dark:border-slate-800 dark:hover:border-slate-700 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white font-medium text-sm transition-colors shadow-sm whitespace-nowrap"
            >
              <span className="whitespace-nowrap">Explorar galeria completa de sites</span>
              <ArrowRightIcon className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* About the Web Designer / Brand Positioning */}
      <section className="py-16 md:py-20 border-b border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shrink-0 shadow-lg shadow-emerald-500/20">
                <div className="relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden">
                  <Image
                    src="/perfil.png"
                    alt="GB Software Solutions - Web Designer"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                  Sobre a GB Software Solutions
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  Somos especializados na criação de websites sob medida para pequenas e médias empresas, consultorias, clínicas e profissionais que precisam de uma presença digital séria e comercialmente atraente.
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Nosso foco não é encher seu site de termos técnicos difíceis, e sim garantir que o seu cliente entenda o que você faz, veja o valor do seu trabalho e clique para falar com você.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Projetos sob medida
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Suporte e acompanhamento
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Entrega ágil
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct WhatsApp Call To Action Banner */}
      <section className="py-16 md:py-24 bg-gradient-to-t from-slate-100 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mb-4">
            Vamos colocar a sua empresa em destaque na internet?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Converse agora diretamente pelo WhatsApp, tire suas dúvidas e receba uma proposta personalizada para o seu site.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-base font-bold shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-5 h-5 text-slate-950 shrink-0" />
              <span className="whitespace-nowrap">Chamar no WhatsApp Agora</span>
            </a>
            <Link
              href="/contato"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-full border border-slate-300 dark:border-slate-800 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white text-base font-medium transition-colors shadow-sm whitespace-nowrap"
            >
              <span className="whitespace-nowrap">Enviar pelo Formulário</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
