import React from "react";
import { prisma } from "@/lib/prisma";
import {
  WhatsAppIcon,
  MailIcon,
} from "@/components/Icons";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import {
  toggleMessageReadAction,
  deleteMessageAction,
} from "@/app/actions/admin";

import { connection } from "next/server";

export const instant = false;

export default async function AdminMensagensPage() {
  await connection();
  let messages: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];

  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("[Admin Mensagens] Queries skipped or table pending migration:", error);
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Mensagens de Contato
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Solicitações e propostas enviadas pelos visitantes do website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
            Total: {messages.length}
          </span>
          {unreadCount > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              {unreadCount} não lida{unreadCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Nenhuma mensagem de contato recebida até o momento.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const cleanPhone = msg.phone.replace(/\D/g, "");
            const waLink = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(
              `Olá ${msg.name}! Vi a mensagem que você enviou pelo site da GB Software Solutions sobre o seu projeto.`
            )}`;

            const toggleReadWithId = toggleMessageReadAction.bind(
              null,
              msg.id,
              msg.read
            );
            const deleteWithId = deleteMessageAction.bind(null, msg.id);

            return (
              <div
                key={msg.id}
                className={`border rounded-2xl p-6 transition-all shadow-sm ${
                  !msg.read
                    ? "border-amber-400/60 dark:border-amber-500/40 bg-amber-50/40 dark:bg-slate-900/90"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">
                        {msg.name}
                      </h2>
                      {!msg.read ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                          Nova / Não lida
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          Lida
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 mt-2">
                      <a
                        href={`mailto:${msg.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <MailIcon className="w-3.5 h-3.5" />
                        <span>{msg.email}</span>
                      </a>

                      <span>•</span>

                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 font-medium transition-colors"
                        title="Responder pelo WhatsApp"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>{msg.phone}</span>
                        <span className="text-[10px] underline ml-0.5">
                          (Conversar)
                        </span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(msg.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                    <form action={toggleReadWithId}>
                      <button
                        type="submit"
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                        title={
                          msg.read ? "Marcar como não lida" : "Marcar como lida"
                        }
                      >
                        {msg.read ? "Marcar não lida" : "Marcar lida"}
                      </button>
                    </form>

                    <DeleteConfirmButton
                      action={deleteWithId}
                      confirmMessage={`Excluir a mensagem de "${msg.name}" permanentemente?`}
                      title="Excluir mensagem"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all hover:scale-[1.01]"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Responder pelo WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
