"use client";

import React, { useActionState } from "react";
import { submitContactForm, ContactActionResult } from "@/app/actions/contact";
import { CheckIcon } from "./Icons";

const initialState: ContactActionResult = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <div className="bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/80 dark:shadow-none transition-colors duration-200">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-1">
          Envie uma mensagem
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Preencha o formulário e responderemos com uma proposta para o seu projeto.
        </p>
      </div>

      {state.message && (
        <div
          role="alert"
          className={`p-4 rounded-xl mb-6 text-sm flex items-start gap-3 ${
            state.success
              ? "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/40 text-rose-800 dark:text-rose-300"
          }`}
        >
          {state.success && (
            <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
              <CheckIcon className="w-4 h-4" />
            </span>
          )}
          <span>{state.message}</span>
        </div>
      )}

      {state.success ? (
        <div className="text-center py-8">
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
            Mensagem registrada com sucesso em nosso sistema!
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form action={formAction} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
            >
              Seu nome ou Nome da Empresa <span className="text-emerald-600 dark:text-emerald-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Ex: João da Silva ou Silva Consultoria"
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 text-sm transition-all shadow-xs"
            />
            {state.errors?.name && (
              <p className="text-rose-600 dark:text-rose-400 text-xs mt-1.5">{state.errors.name}</p>
            )}
          </div>

          {/* Email and Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
              >
                E-mail de contato <span className="text-emerald-600 dark:text-emerald-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="seuemail@empresa.com.br"
                defaultValue=""
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 text-sm transition-all shadow-xs"
              />
              {state.errors?.email && (
                <p className="text-rose-600 dark:text-rose-400 text-xs mt-1.5">{state.errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
              >
                Telefone / WhatsApp <span className="text-emerald-600 dark:text-emerald-400">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="(11) 99999-9999"
                defaultValue=""
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 text-sm transition-all shadow-xs"
              />
              {state.errors?.phone && (
                <p className="text-rose-600 dark:text-rose-400 text-xs mt-1.5">{state.errors.phone}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
            >
              Conte sobre o site que você precisa <span className="text-emerald-600 dark:text-emerald-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Ex: Preciso de um site institucional moderno para a minha empresa com apresentação de serviços e botão de WhatsApp..."
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 text-sm transition-all shadow-xs resize-y"
            ></textarea>
            {state.errors?.message && (
              <p className="text-rose-600 dark:text-rose-400 text-xs mt-1.5">{state.errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
          >
            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Enviando mensagem...</span>
              </>
            ) : (
              <span>Enviar Solicitação de Proposta</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
