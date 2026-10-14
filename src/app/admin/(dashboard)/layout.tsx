import React from "react";
import Link from "next/link";
import { requireAdminAuth } from "@/lib/session";
import { logoutAdminAction } from "@/app/actions/admin";
import {
  FolderIcon,
  MessageSquareIcon,
  ExternalLinkIcon,
  LogOutIcon,
} from "@/components/Icons";

export const instant = false;

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand & Admin Badge */}
            <div className="flex items-center gap-4">
              <Link href="/admin" className="flex items-center gap-2">
                <span className="font-bold text-white text-base">
                  GB <span className="text-emerald-400">Admin</span>
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Painel Privado
                </span>
              </Link>
            </div>

            {/* Center: Admin Links */}
            <nav className="flex items-center space-x-1 sm:space-x-4">
              <Link
                href="/admin"
                className="px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Início
              </Link>
              <Link
                href="/admin/projetos"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <FolderIcon className="w-3.5 h-3.5" />
                <span>Projetos</span>
              </Link>
              <Link
                href="/admin/mensagens"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <MessageSquareIcon className="w-3.5 h-3.5" />
                <span>Mensagens</span>
              </Link>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <span>Ver Site</span>
                <ExternalLinkIcon className="w-3 h-3" />
              </Link>

              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 transition-colors"
                  title={`Desconectar (${session.email})`}
                >
                  <LogOutIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
