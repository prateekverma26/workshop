import "./ui.css";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  message?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  message,
  action,
}: EmptyStateProps) {
  return (
    <div className="state">
      <span className="state__icon">
        <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="state__title">{title}</h3>
      {message ? <p className="state__message">{message}</p> : null}
      {action}
    </div>
  );
}
