"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { AdminActionResult } from "@/app/actions/admin";

interface ProjectFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    category: string;
    shortDescription: string;
    fullDescription?: string | null;
    coverImage: string;
    websiteUrl?: string | null;
    demoVideoUrl?: string | null;
    isDemonstration: boolean;
    featured: boolean;
    order: number;
  };
  action: (
    prevState: AdminActionResult | null,
    formData: FormData
  ) => Promise<AdminActionResult>;
  submitLabel: string;
}

const initialState: AdminActionResult = {
  success: false,
  message: "",
};

export function ProjectForm({
  initialData,
  action,
  submitLabel,
}: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const categories = [
    "Website Institucional",
    "Website Corporativo",
    "Catálogo & Portfólio",
    "Gastronomia & Comércio Local",
    "Landing Page de Conversão",
    "E-commerce & Loja Virtual",
    "Outro",
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm max-w-3xl">
      {state.message && (
        <div
          role="alert"
          className={`p-4 rounded-xl mb-6 text-sm ${
            state.success
              ? "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 text-rose-800 dark:text-rose-300"
          }`}
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Nome / Título do Projeto <span className="text-emerald-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={initialData?.title || ""}
              placeholder="Ex: Clínica Bella Vita"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm"
            />
            {state.errors?.title && (
              <p className="text-rose-500 text-xs mt-1.5">{state.errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Slug (Identificador URL)
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              defaultValue={initialData?.slug || ""}
              placeholder="clinica-bella-vita (deixe vazio para auto-gerar)"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm"
            />
          </div>
        </div>

        {/* Category & Order */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="sm:col-span-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Categoria Comercial
            </label>
            <select
              id="category"
              name="category"
              defaultValue={initialData?.category || "Website Institucional"}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="order"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Ordem de Exibição
            </label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={initialData?.order ?? 0}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="shortDescription"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Descrição Comercial Curta <span className="text-emerald-500">*</span>
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            rows={3}
            required
            defaultValue={initialData?.shortDescription || ""}
            placeholder="Ex: Website institucional moderno com foco em captação de pacientes e agendamento direto via WhatsApp."
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm resize-y"
          />
          {state.errors?.shortDescription && (
            <p className="text-rose-500 text-xs mt-1.5">
              {state.errors.shortDescription}
            </p>
          )}
        </div>

        {/* Full Description */}
        <div>
          <label
            htmlFor="fullDescription"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Descrição Detalhada (Opcional)
          </label>
          <textarea
            id="fullDescription"
            name="fullDescription"
            rows={4}
            defaultValue={initialData?.fullDescription || ""}
            placeholder="Detalhes sobre a solução visual, foco comercial e diferenciais deste projeto..."
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm resize-y"
          />
        </div>

        {/* Cover Image & External URLs */}
        <div>
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            URL da Imagem de Capa <span className="text-emerald-500">*</span>
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="url"
            required
            defaultValue={initialData?.coverImage || ""}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm"
          />
          {state.errors?.coverImage && (
            <p className="text-rose-500 text-xs mt-1.5">
              {state.errors.coverImage}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="websiteUrl"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              URL do Site Online (Opcional)
            </label>
            <input
              id="websiteUrl"
              name="websiteUrl"
              type="url"
              defaultValue={initialData?.websiteUrl || ""}
              placeholder="https://exemplo-site.com.br"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="demoVideoUrl"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              URL de Vídeo/Demonstração (Opcional)
            </label>
            <input
              id="demoVideoUrl"
              name="demoVideoUrl"
              type="url"
              defaultValue={initialData?.demoVideoUrl || ""}
              placeholder="https://youtube.com/..."
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm"
            />
          </div>
        </div>

        {/* Checkboxes: Featured & isDemonstration */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initialData?.featured ?? false}
              className="mt-1 w-4 h-4 rounded text-emerald-500 bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 focus:ring-emerald-400 focus:ring-offset-white dark:focus:ring-offset-slate-900"
            />
            <div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                Exibir na Página Inicial (Destaque)
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Aparece na seção principal da home page.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isDemonstration"
              defaultChecked={initialData?.isDemonstration ?? false}
              className="mt-1 w-4 h-4 rounded text-emerald-500 bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 focus:ring-emerald-400 focus:ring-offset-white dark:focus:ring-offset-slate-900"
            />
            <div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                Projeto Conceitual / Modelo Demonstrativo
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Em conformidade com a transparência comercial, exibe o selo &quot;Projeto Modelo&quot; para projetos não executados para clientes reais.
              </span>
            </div>
          </label>
        </div>

        {/* Buttons */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-4">
          <Link
            href="/admin/projetos"
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
          >
            {isPending ? "Salvando..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
