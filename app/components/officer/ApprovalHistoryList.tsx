import "./officer.css";
import { StatusBadge, type PassStatus } from "../ui/StatusBadge";
import { EmptyState } from "../ui/EmptyState";
import { History } from "lucide-react";

export interface HistoryEntry {
  id: string;
  visitorName: string;
  decision: Extract<PassStatus, "APPROVED" | "REJECTED">;
  decidedAt: string;
  entryStatus: string;
}

interface ApprovalHistoryListProps {
  entries: HistoryEntry[];
}

export function ApprovalHistoryList({ entries }: ApprovalHistoryListProps) {
  if (entries.length === 0) {
    return (
      <EmptyState
        icon={History}
        title="No decisions yet"
        message="Requests you approve or reject will be logged here for audit."
      />
    );
  }

  return (
    <div className="data-table" role="table" aria-label="Approval history">
      <div className="data-table__head history-grid" role="row">
        <span role="columnheader">Visitor</span>
        <span role="columnheader">Decision</span>
        <span role="columnheader">Decided</span>
        <span role="columnheader">Entry status</span>
      </div>
      {entries.map((entry) => (
        <div key={entry.id} role="row" className="data-table__row history-grid">
          <span className="data-table__cell data-table__primary">
            {entry.visitorName}
          </span>
          <span className="data-table__cell">
            <StatusBadge status={entry.decision} />
          </span>
          <span className="data-table__cell data-table__muted tabular-nums">
            {entry.decidedAt}
          </span>
          <span className="data-table__cell data-table__muted">
            {entry.entryStatus}
          </span>
        </div>
      ))}
    </div>
  );
}
