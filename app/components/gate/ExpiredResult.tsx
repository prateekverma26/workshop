import "./gate.css";
import { XCircle } from "lucide-react";

interface ExpiredResultProps {
  expiryTime: string;
  onEscalate?: () => void;
}

export function ExpiredResult({ expiryTime, onEscalate }: ExpiredResultProps) {
  return (
    <div className="result result--danger" role="alert">
      <div className="result__band">
        <XCircle size={28} aria-hidden="true" />
        PASS EXPIRED
      </div>
      <div className="result__body">
        <div className="denied">
          <XCircle size={72} strokeWidth={1.5} aria-hidden="true" />
          <p className="denied__headline">Pass Expired</p>
          <p className="denied__detail">This pass was valid until {expiryTime}.</p>
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
