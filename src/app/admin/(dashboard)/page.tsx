import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  FolderIcon,
  MessageSquareIcon,
  PlusIcon,
  ArrowRightIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export const instant = false;

export default async function AdminDashboardPage() {
  let projectsCount = 0;
  let messagesCount = 0;
  let unreadCount = 0;
  let recentMessages: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];

  try {
    const results = await Promise.all([
      prisma.project.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);
    projectsCount = results[0];
    messagesCount = results[1];
    unreadCount = results[2];
    recentMessages = results[3];
  } catch (error) {
    console.warn("[Admin Dashboard] Initial database queries skipped or tables pending migration:", error);
  }

  return (
    <div className="space-y-8">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Painel de Controle
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Visão geral dos projetos cadastrados e solicitações de clientes recebidas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projetos/novo"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-emerald-500/20"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Novo Projeto</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Projetos no Portfólio
            </span>
            <span className="p-2 rounded-xl bg-slate-800 text-slate-300">
              <FolderIcon className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-extrabold text-white mt-3">{projectsCount}</p>
          <Link
            href="/admin/projetos"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 mt-4 font-medium"
          >
            <span>Gerenciar projetos</span>
            <ArrowRightIcon className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Mensagens Recebidas
            </span>
            <span className="p-2 rounded-xl bg-slate-800 text-slate-300">
              <MessageSquareIcon className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-extrabold text-white mt-3">{messagesCount}</p>
          <Link
            href="/admin/mensagens"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 mt-4 font-medium"
          >
            <span>Ver todas as mensagens</span>
            <ArrowRightIcon className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Novas / Não Lidas
            </span>
            <span
              className={`p-2 rounded-xl ${
                unreadCount > 0
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              <MessageSquareIcon className="w-4 h-4" />
            </span>
          </div>
          <p
            className={`text-3xl font-extrabold mt-3 ${
              unreadCount > 0 ? "text-amber-400" : "text-slate-400"
            }`}
          >
            {unreadCount}
          </p>
          <span className="text-xs text-slate-500 mt-4 block">
            {unreadCount > 0
              ? "Existem contatos aguardando sua resposta"
              : "Todas as mensagens foram lidas"}
          </span>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Últimas Mensagens de Contato</h2>
            <p className="text-xs text-slate-400">
              Contatos recebidos através do formulário do site.
            </p>
          </div>
          <Link
            href="/admin/mensagens"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Ver todas ({messagesCount}) &rarr;
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Nenhuma mensagem recebida ainda.
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {recentMessages.map((msg) => {
              const cleanPhone = msg.phone.replace(/\D/g, "");
              const waLink = `https://wa.me/55${cleanPhone}`;

              return (
                <div
                  key={msg.id}
                  className={`p-6 transition-colors ${
                    !msg.read ? "bg-slate-800/60" : "hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">
                        {msg.name}
                      </span>
                      {!msg.read && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Nova
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(msg.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-3">
                    <a
                      href={`mailto:${msg.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {msg.email}
                    </a>
                    <span>•</span>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>{msg.phone}</span>
                    </a>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
                    {msg.message}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
