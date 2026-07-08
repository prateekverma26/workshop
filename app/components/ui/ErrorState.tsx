import "./ui.css";
import type { LucideIcon } from "lucide-react";
import { TriangleAlert } from "lucide-react";

interface ErrorStateProps {
  icon?: LucideIcon;
  title: string;
  message?: string;
  action?: React.ReactNode;
}

export function ErrorState({
  icon: Icon = TriangleAlert,
  title,
  message,
  action,
}: ErrorStateProps) {
  return (
    <div className="state state--error" role="alert">
      <span className="state__icon">
        <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="state__title">{title}</h3>
      {message ? <p className="state__message">{message}</p> : null}
      {action}
    </div>
  );
}
