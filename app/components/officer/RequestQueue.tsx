import "./officer.css";
import { StatusBadge } from "../ui/StatusBadge";
import { EmptyState } from "../ui/EmptyState";
import { Inbox } from "lucide-react";

export interface QueueItem {
  id: string;
  visitorName: string;
  purposeSummary: string;
  requestedTime: string;
  submittedAgo: string;
  isBreached?: boolean;
}

interface RequestQueueProps {
  items: QueueItem[];
  activeId?: string;
  onOpen: (id: string) => void;
}

export function RequestQueue({ items, activeId, onOpen }: RequestQueueProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No pending requests"
        message="New visitor requests for your department will appear here."
      />
    );
  }

  return (
    <div className="data-table" role="table" aria-label="Pending requests">
      <div className="data-table__head queue-grid" role="row">
        <span role="columnheader">Visitor</span>
        <span role="columnheader">Purpose</span>
        <span role="columnheader">Requested</span>
        <span role="columnheader">Waiting</span>
        <span role="columnheader">Status</span>
      </div>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="row"
          className={`data-table__row queue-grid ${
            item.id === activeId ? "data-table__row--active" : ""
          } ${item.isBreached ? "data-table__row--breached" : ""}`}
          onClick={() => onOpen(item.id)}
        >
          <span className="data-table__cell data-table__primary">
            {item.isBreached ? (
              <span className="data-table__breach-dot" aria-label="SLA breached" />
            ) : null}{" "}
            {item.visitorName}
          </span>
          <span className="data-table__cell data-table__cell--truncate data-table__muted">
            {item.purposeSummary}
          </span>
          <span className="data-table__cell data-table__muted tabular-nums">
            {item.requestedTime}
          </span>
          <span className="data-table__cell data-table__muted">{item.submittedAgo}</span>
          <span className="data-table__cell">
            <StatusBadge status="PENDING" />
          </span>
        </button>
      ))}
    </div>
  );
}
