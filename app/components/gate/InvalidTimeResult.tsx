import "./gate.css";
import { Clock } from "lucide-react";
import { TimeWindow } from "../ui/TimeWindow";

interface InvalidTimeResultProps {
  validFrom: string;
  validTo: string;
  onEscalate?: () => void;
}

export function InvalidTimeResult({
  validFrom,
  validTo,
  onEscalate,
}: InvalidTimeResultProps) {
  return (
    <div className="result result--amber" role="alert">
      <div className="result__band">
        <Clock size={28} aria-hidden="true" />
        OUTSIDE VALID WINDOW
      </div>
      <div className="result__body">
        <div className="denied">
          <Clock size={72} strokeWidth={1.5} aria-hidden="true" />
          <p className="denied__headline">Outside Valid Window</p>
          <p className="denied__detail">
            This pass is only valid <TimeWindow from={validFrom} to={validTo} />.
          </p>
          {onEscalate ? (
            <button type="button" className="btn btn--secondary" onClick={onEscalate}>
              Call supervisor
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
