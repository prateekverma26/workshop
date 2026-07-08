import "./gate.css";
import { StatusBadge } from "../ui/StatusBadge";
import { EmptyState } from "../ui/EmptyState";
import { ShieldCheck } from "lucide-react";

export interface ShiftException {
  id: string;
  type: "MANUAL_ENTRY" | "REJECTED";
  label: string;
}

interface ShiftSummaryProps {
  entries: number;
  exits: number;
  exceptions: ShiftException[];
}

export function ShiftSummary({ entries, exits, exceptions }: ShiftSummaryProps) {
  return (
    <section className="shift-summary" aria-label="Shift summary">
      <div className="shift-summary__stats">
        <div className="shift-summary__stat">
          <span className="shift-summary__value">{entries}</span>
          <span className="shift-summary__label">Entries granted</span>
        </div>
        <div className="shift-summary__stat">
          <span className="shift-summary__value">{exits}</span>
          <span className="shift-summary__label">Exits logged</span>
        </div>
        <div className="shift-summary__stat">
          <span className="shift-summary__value">{exceptions.length}</span>
          <span className="shift-summary__label">Exceptions</span>
        </div>
      </div>

      <div className="shift-summary__exceptions">
        {exceptions.length === 0 ? (
          <EmptyState
            icon={ShieldCheck}
            title="No exceptions this shift"
            message="Every entry was verified through the standard digital flow."
          />
        ) : (
          exceptions.map((ex) => (
            <div key={ex.id} className="manual-lookup__result">
              <StatusBadge status={ex.type} />
              <span>{ex.label}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
