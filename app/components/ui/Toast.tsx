"use client";

import "./ui.css";
import { CircleCheck, CircleX, Info } from "lucide-react";

export type ToastVariant = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
}

interface ToastRegionProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

const ICONS = {
  success: CircleCheck,
  error: CircleX,
  info: Info,
} as const;

export function ToastRegion({ toasts, onDismiss }: ToastRegionProps) {
  return (
    <div className="toast-region" role="region" aria-label="Notifications">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.variant];
        return (
          <output
            key={toast.id}
            className={`toast toast--${toast.variant}`}
            aria-live={toast.variant === "error" ? "assertive" : "polite"}
            onClick={() => onDismiss(toast.id)}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{toast.message}</span>
          </output>
        );
      })}
    </div>
  );
}
