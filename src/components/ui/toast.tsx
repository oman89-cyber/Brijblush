"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastTone = "success" | "error" | "info";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastContextValue {
  pushToast: (title: string, opts?: { description?: string; tone?: ToastTone }) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const pushToast = React.useCallback(
    (title: string, opts?: { description?: string; tone?: ToastTone }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const tone = opts?.tone ?? "info";
      setToasts((prev) => [...prev, { id, title, description: opts?.description, tone }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4200);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-[calc(100%-2rem)] pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 bg-[#FFFFFF] border-2 border-[#211D19] shadow-[4px_4px_0px_#211D19] p-3.5 text-sm"
          >
            {toast.tone === "success" && (
              <CheckCircle2 className="h-5 w-5 text-[#173F35] shrink-0 mt-0.5" />
            )}
            {toast.tone === "error" && (
              <AlertCircle className="h-5 w-5 text-[#991B1B] shrink-0 mt-0.5" />
            )}
            {toast.tone === "info" && (
              <Info className="h-5 w-5 text-[#263D73] shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#211D19]">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-[#211D19]/75 mt-0.5">{toast.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-[#211D19]/60 hover:text-[#211D19] cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    return {
      pushToast: () => {},
    };
  }
  return ctx;
}
