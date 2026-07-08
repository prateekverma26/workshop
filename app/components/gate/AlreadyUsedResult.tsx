import "./gate.css";
import { XCircle } from "lucide-react";

interface AlreadyUsedResultProps {
  priorEntryTime: string;
  priorGate: string;
  onEscalate?: () => void;
}

export function AlreadyUsedResult({
  priorEntryTime,
  priorGate,
  onEscalate,
}: AlreadyUsedResultProps) {
  return (
    <div className="result result--danger" role="alert">
      <div className="result__band">
        <XCircle size={28} aria-hidden="true" />
        ALREADY ENTERED
      </div>
      <div className="result__body">
        <div className="denied">
          <XCircle size={72} strokeWidth={1.5} aria-hidden="true" />
          <p className="denied__headline">Already Entered</p>
          <p className="denied__detail">
            This pass was used at {priorEntryTime} · {priorGate}.
          </p>
          {onEscalate ? (
            <button type="button" className="btn btn--ghost" onClick={onEscalate}>
              Escalate to supervisor
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
