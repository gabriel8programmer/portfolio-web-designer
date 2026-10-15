"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { loginAdminAction, AdminActionResult } from "@/app/actions/admin";
import { LockIcon } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const initialState: AdminActionResult = {
  success: false,
  message: "",
};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAdminAction,
    initialState
  );

  React.useEffect(() => {
    if (state.success) {
      // Use window.location.replace to perform a clean browser navigation
      // across the authentication boundary, resetting router cache state
      // and preventing re-trigger loops upon subsequent logout.
      window.location.replace("/admin");
    }
  }, [state.success]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-200 relative">
      {/* Top corner actions */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3" aria-label="GB Software Solutions - Início">
            <Logo className="h-9 w-auto" />
          </Link>
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <LockIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Painel Administrativo Privado</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-2xl">
          <h1 className="text-xl font-bold text-slate-950 dark:text-white mb-2">Acesso Restrito</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Informe suas credenciais configuradas para acessar a gestão do portfólio.
          </p>

          {state.message && (
            <div
              role="alert"
              className="p-3.5 rounded-xl mb-6 text-sm bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300"
            >
              {state.message}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                E-mail do Administrador
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@gbsoftwaresolutions.com.br"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isPending || state.success}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] mt-2 cursor-pointer"
            >
              {state.success ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  <span>Autenticado! Entrando no painel...</span>
                </>
              ) : isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  <span>Autenticando...</span>
                </>
              ) : (
                <span>Entrar no Painel</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              &larr; Voltar ao site público
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
