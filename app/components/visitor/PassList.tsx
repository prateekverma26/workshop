import "./visitor.css";
import Link from "next/link";
import { ChevronRight, TicketCheck } from "lucide-react";
import { StatusBadge, type PassStatus } from "../ui/StatusBadge";
import { EmptyState } from "../ui/EmptyState";

export interface PassListItem {
  id: string;
  referenceNumber: string;
  purpose: string;
  date: string;
  status: PassStatus;
}

interface PassListProps {
  passes: PassListItem[];
}

export function PassList({ passes }: PassListProps) {
  if (passes.length === 0) {
    return (
      <EmptyState
        icon={TicketCheck}
        title="No passes yet"
        message="When you request a gate pass, it will show up here with its status."
        action={
          <Link href="/request" className="btn btn--primary">
            Request your first pass
          </Link>
        }
      />
    );
  }

  return (
    <ul className="pass-list">
      {passes.map((pass) => (
        <li key={pass.id}>
          <Link href={`/status/${pass.id}`} className="pass-list__row">
            <span className="pass-list__main">
              <span className="pass-list__ref tabular-nums">{pass.referenceNumber}</span>
              <span className="pass-list__purpose">{pass.purpose}</span>
              <span className="pass-list__date">{pass.date}</span>
            </span>
            <StatusBadge status={pass.status} />
            <ChevronRight className="pass-list__chevron" size={18} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
