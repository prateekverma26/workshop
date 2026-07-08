import "./ui.css";
import { Flag } from "lucide-react";

export type PassStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED"
  | "USED"
  | "MANUAL_ENTRY";

interface StatusBadgeProps {
  status: PassStatus;
}

const LABELS: Record<PassStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  EXPIRED: "Expired",
  USED: "Used",
  MANUAL_ENTRY: "Manual entry",
};

const MODIFIERS: Record<PassStatus, string> = {
  PENDING: "badge--pending",
  APPROVED: "badge--approved",
  REJECTED: "badge--rejected",
  EXPIRED: "badge--expired",
  USED: "badge--used",
  MANUAL_ENTRY: "badge--manual",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`badge ${MODIFIERS[status]}`}>
      {status === "MANUAL_ENTRY" ? (
        <Flag size={12} strokeWidth={2} aria-hidden="true" />
      ) : (
        <span className="badge__dot" aria-hidden="true" />
      )}
      {LABELS[status]}
    </span>
  );
}
