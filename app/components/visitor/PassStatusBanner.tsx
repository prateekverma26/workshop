import "./visitor.css";
import { StatusBadge, type PassStatus } from "../ui/StatusBadge";

type BannerStatus = Extract<
  PassStatus,
  "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED"
>;

interface PassStatusBannerProps {
  status: BannerStatus;
  message: string;
  meta?: string;
  action?: React.ReactNode;
}

const MODIFIER: Record<BannerStatus, string> = {
  PENDING: "status-banner--pending",
  APPROVED: "status-banner--approved",
  REJECTED: "status-banner--rejected",
  EXPIRED: "status-banner--expired",
};

export function PassStatusBanner({
  status,
  message,
  meta,
  action,
}: PassStatusBannerProps) {
  return (
    <section className={`status-banner ${MODIFIER[status]}`} aria-live="polite">
      <StatusBadge status={status} />
      <p className="status-banner__message">{message}</p>
      {meta ? <p className="status-banner__meta">{meta}</p> : null}
      {action}
    </section>
  );
}
