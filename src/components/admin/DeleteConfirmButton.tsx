"use client";

import React, { useTransition } from "react";
import { TrashIcon } from "@/components/Icons";

interface DeleteConfirmButtonProps {
  action: () => Promise<void>;
  confirmMessage: string;
  title?: string;
  className?: string;
}

export function DeleteConfirmButton({
  action,
  confirmMessage,
  title = "Excluir",
  className = "p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer",
}: DeleteConfirmButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (window.confirm(confirmMessage)) {
      startTransition(async () => {
        await action();
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      title={title}
      className={`${className} ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <TrashIcon className="w-4 h-4" />
    </button>
  );
}
